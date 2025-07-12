-- Add validation to prevent users from changing their own role

CREATE OR REPLACE FUNCTION public.validate_profile_update()
RETURNS TRIGGER AS $$
BEGIN
  -- If role is being changed and user is not admin, prevent the update
  IF OLD.role != NEW.role AND public.get_current_user_role() != 'admin' THEN
    RAISE EXCEPTION 'Only administrators can change user roles';
  END IF;
  
  -- Log role changes for audit purposes
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
      jsonb_build_object('old_role', OLD.role, 'target_user', OLD.user_id),
      jsonb_build_object('new_role', NEW.role, 'target_user', NEW.user_id),
      auth.uid(),
      now()
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for profile validation
CREATE TRIGGER validate_profile_updates
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_profile_update();