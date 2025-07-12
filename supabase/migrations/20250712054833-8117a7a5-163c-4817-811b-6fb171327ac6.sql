-- CRITICAL SECURITY FIX: Fix privilege escalation vulnerability

-- 1. Change default role from 'admin' to 'user' for new profiles
ALTER TABLE public.profiles 
ALTER COLUMN role SET DEFAULT 'user'::app_role;

-- 2. Update any existing profiles that have admin role (except the first admin)
-- Keep the first created profile as admin, change others to user
UPDATE public.profiles 
SET role = 'user'::app_role 
WHERE role = 'admin'::app_role 
AND id NOT IN (
  SELECT id FROM public.profiles 
  WHERE role = 'admin'::app_role 
  ORDER BY created_at ASC 
  LIMIT 1
);

-- 3. Drop the existing policy that allows users to update their own profile
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

-- 4. Create a new policy that prevents users from updating their role
CREATE POLICY "Users can update their own profile except role" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (
  auth.uid() = user_id 
  AND (
    -- User can only update if they're not changing the role
    OLD.role = NEW.role
    OR 
    -- Or if they're an admin (can change anyone's role)
    public.get_current_user_role() = 'admin'
  )
);

-- 5. Create a specific policy for admins to update roles
CREATE POLICY "Admins can update user roles" 
ON public.profiles 
FOR UPDATE 
USING (public.get_current_user_role() = 'admin')
WITH CHECK (public.get_current_user_role() = 'admin');

-- 6. Add audit logging function for role changes
CREATE OR REPLACE FUNCTION public.log_role_changes()
RETURNS TRIGGER AS $$
BEGIN
  -- Log role changes for security audit
  IF OLD.role != NEW.role THEN
    INSERT INTO public.audit_log (
      table_name,
      operation,
      old_values,
      new_values,
      user_id,
      timestamp
    ) VALUES (
      'profiles',
      'role_change',
      jsonb_build_object('old_role', OLD.role),
      jsonb_build_object('new_role', NEW.role),
      auth.uid(),
      now()
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. Create audit log table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.audit_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  table_name TEXT NOT NULL,
  operation TEXT NOT NULL,
  old_values JSONB,
  new_values JSONB,
  user_id UUID,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on audit log
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs
CREATE POLICY "Only admins can view audit logs" 
ON public.audit_log 
FOR SELECT 
USING (public.get_current_user_role() = 'admin');

-- 8. Create trigger for role change logging
CREATE TRIGGER log_profile_role_changes
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.log_role_changes();