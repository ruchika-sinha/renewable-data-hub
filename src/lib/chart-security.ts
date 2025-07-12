/**
 * Secure CSS generation utilities for chart components
 * Prevents XSS attacks by sanitizing CSS values
 */

/**
 * Sanitizes CSS values to prevent XSS attacks
 * Only allows safe characters for CSS values
 */
export function sanitizeCSSValue(value: string): string {
  // Remove any potentially dangerous characters
  // Allow only alphanumeric, hyphens, periods, commas, parentheses, spaces, and hash for colors
  const sanitized = value.replace(/[^a-zA-Z0-9\-.,()#% ]/g, '');
  
  // Additional validation for color values
  if (value.startsWith('#')) {
    // Hex color validation
    const hexPattern = /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/;
    return hexPattern.test(value) ? value : '';
  }
  
  if (value.startsWith('hsl') || value.startsWith('rgb')) {
    // Basic validation for hsl/rgb values
    const colorPattern = /^(hsl|rgb)a?\(\s*[\d.,\s%]+\s*\)$/;
    return colorPattern.test(value) ? sanitized : '';
  }
  
  return sanitized;
}

/**
 * Sanitizes CSS selector to prevent injection
 */
export function sanitizeCSSSelector(selector: string): string {
  // Only allow safe CSS selector characters
  return selector.replace(/[^a-zA-Z0-9\-_.\[\]="' ]/g, '');
}

/**
 * Generates safe CSS for chart theming
 */
export function generateChartCSS(
  themes: Record<string, string>,
  chartId: string,
  colorConfig: Array<[string, { theme?: Record<string, string>; color?: string }]>
): string {
  const sanitizedChartId = sanitizeCSSSelector(chartId);
  
  return Object.entries(themes)
    .map(([theme, prefix]) => {
      const sanitizedPrefix = sanitizeCSSSelector(prefix);
      const cssRules = colorConfig
        .map(([key, itemConfig]) => {
          const sanitizedKey = sanitizeCSSSelector(key);
          const color = itemConfig.theme?.[theme] || itemConfig.color;
          
          if (!color) return null;
          
          const sanitizedColor = sanitizeCSSValue(color);
          return sanitizedColor ? `  --color-${sanitizedKey}: ${sanitizedColor};` : null;
        })
        .filter(Boolean)
        .join('\n');
      
      return cssRules ? `${sanitizedPrefix} [data-chart="${sanitizedChartId}"] {\n${cssRules}\n}` : '';
    })
    .filter(Boolean)
    .join('\n');
}