# Custom Icons

This directory contains custom SVG icons that work alongside Lucide icons in the main `Icon` component.

## Included Custom Icons

- **LinkedIn**: Custom LinkedIn icon that replaces the Lucide version
- **YouTube**: Custom YouTube icon for video content
- **Example Custom**: Template for creating new icons

## Adding a New Custom Icon

1. **Create the icon component** (e.g., `MyCustomIcon.tsx`):

```tsx
import { CustomIconProps } from "./index";

export default function MyCustomIcon({
  className,
  strokeWidth = 1.5,
}: Omit<CustomIconProps, "size">) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Your SVG content here */}
    </svg>
  );
}
```

2. **Export it in `IconList.ts`**:

```tsx
export { default as MyCustomIcon } from "./my-custom-icon";
```

3. **Add it to the component map** in `frontend/components/primitves/Icon.tsx`:

```tsx
const customIconComponents: Record<string, CustomIcons.CustomIcon> = {
  // ... existing icons
  "my-custom-icon": CustomIcons.MyCustomIcon,
};
```

## Replacing Lucide Icons

To replace a Lucide icon with a custom version (like we did with LinkedIn):

1. Create your custom icon component
2. Remove the Lucide import from `frontend/components/icon.tsx`
3. Remove the Lucide icon from the `lucideIconComponents` map
4. Add your custom icon to the `customIconComponents` map using the same key
5. Update the Sanity variant title to indicate it's custom

The system prioritizes custom icons, so your custom version will be used instead of the Lucide one.

## Guidelines

- **Naming**: Use kebab-case for icon variant names (e.g., `my-custom-icon`)
- **Props**: Always accept `className` and `strokeWidth` props to match Lucide icons
- **ViewBox**: Use consistent viewBox dimensions (typically `0 0 24 24`)
- **Styling**: Use `currentColor` for stroke/fill to inherit text color
- **StrokeWidth**: Default to `1.5` to match Lucide icon defaults
- **Fill vs Stroke**: For fill-based icons (like LinkedIn and YouTube), use `fill="currentColor"` instead of `stroke`

## Usage

Once added, custom icons can be used exactly like Lucide icons:

```tsx
<Icon iconVariant="linkedin" className="w-6 h-6" />
<Icon iconVariant="youtube" className="w-6 h-6" />
```

The `Icon` component will automatically detect if it's a custom icon or Lucide icon and render appropriately.
