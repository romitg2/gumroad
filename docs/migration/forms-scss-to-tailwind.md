# Forms SCSS to Tailwind CSS Migration Plan

This document breaks down the migration of `app/javascript/stylesheets/_forms.scss` (433 lines) into manageable chunks.

## Migration Strategy Overview

- **No `@apply` directives** - All Tailwind classes must be applied directly in markup
- **Mobile-first** - Use breakpoint prefixes only where values change
- **Use `classNames` utility** - For conditional classes (not `cx` or `twMerge`)
- **Preserve functionality** - Maintain all existing behavior and states

---

## Chunk 1: Simple Utility Styles (Low Complexity)
**Lines: 242-244, 291-293, 401-403, 405-407, 429-432**

### What's Included:
- `input[type="file"]` - Hidden file inputs
- `input[type="search"]` - Search input appearance reset
- `[role="combobox"]` - Combobox cursor
- `textarea` - Vertical resize
- `[role="radio"]`, `[role="checkbox"]` - ARIA role cursors

### Migration Approach:
These are simple, single-property styles that can be migrated directly to Tailwind classes:
- `display: none` → `hidden`
- `appearance: none` → `appearance-none`
- `cursor: pointer` → `cursor-pointer`
- `resize: vertical` → `resize-y`

### Dependencies:
None - these are standalone

### Components Affected:
- File upload components
- Search inputs
- Combobox components
- Textareas
- Radio/checkbox role elements

---

## Chunk 2: Label Styles (Low-Medium Complexity) ✅ COMPLETED
**Lines: 35-44**

### What's Included:
- Base label styles (inline-flex, gap, font-size, cursor)
- Disabled state when containing disabled input

### Migration Approach:
**Created a reusable `Label` component** at `app/javascript/components/Label.tsx`:

```tsx
import { Label } from "$app/components/Label";

// Usage with htmlFor
<Label htmlFor="input-id">Label text</Label>

// Usage wrapping input (e.g., checkboxes)
<Label>
  <input type="checkbox" />
  Label text
</Label>
```

The component applies these Tailwind classes:
- `inline-flex gap-2 text-base cursor-pointer`
- `has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-30`

### Dependencies:
None - standalone component

### Components Affected:
All form labels throughout the application

### Migration Status:
- ✅ Removed label styles from `_forms.scss`
- ✅ Created `Label.tsx` component
- 🔄 In progress: Updating components to use `<Label>` instead of `<label>`

### Notes:
- Uses `:has()` pseudo-class for disabled state - Tailwind supports this with `has-[:disabled]:`
- Font size: `$form-element-font-size: 2` = `1rem` = `text-base`
- Gap: `spacer(2)` = `0.5rem` = `gap-2`
- Disabled opacity: `$disabled-opacity: 0.3` = `opacity-30`

---

## Chunk 3: Base Input Fields (High Complexity - Foundation)
**Lines: 12-33, 7-10 (placeholder)**

### What's Included:
- Base styles for all input types, textarea, select
- Placeholder styles
- Focus outline
- Disabled state

### Migration Approach:
This is the foundation - needs to be applied to all form inputs. Create a base component or utility class pattern:

```tsx
// Base input classes
const baseInputClasses = "font-inherit py-2 px-4 text-sm border rounded block w-full bg-background placeholder:text-muted focus:outline focus:outline-2 disabled:cursor-not-allowed disabled:opacity-50"
```

### Dependencies:
None - this is the foundation

### Components Affected:
**ALL** form inputs in the entire application

### Notes:
- This is the most critical chunk - affects everything
- Need to map SCSS variables to Tailwind:
  - `$form-element-padding-y` → padding-y value
  - `$form-element-padding-x` → padding-x value
  - `$form-element-font-size` → text size
  - `$form-element-border-radius` → rounded value
  - `$border` → border classes
  - `$outline` → outline classes
  - `$disabled-opacity` → opacity value

---

## Chunk 4: Fieldset & Legend (Medium Complexity)
**Lines: 46-83**

### What's Included:
- Fieldset layout (flex column, gap, no border)
- Legend styles (flex, align-items, font-weight, margin)
- Legend child styles (label, anchor font-weight)
- Last child float right
- Small text muted
- Role="group" specific styles

### Migration Approach:
```tsx
<fieldset className="flex flex-col gap-2 border-none">
  <legend className="flex items-center relative font-bold mb-2 w-full text-sm [&_label]:font-normal [&_a]:font-normal [&>:last-child:not(:only-child)]:float-right [&>:last-child:not(:only-child)]:ml-auto">
    ...
  </legend>
  <small className="text-muted">...</small>
</fieldset>
```

### Dependencies:
Chunk 3 (base inputs) - fieldset contains inputs

### Components Affected:
All fieldsets (extensively used in forms)

### Notes:
- Complex selectors like `:last-child:not(:only-child)` may need arbitrary variants
- Safari fieldset bug mentioned in comment - keep flexbox approach
- Role="group" styles need special handling

---

## Chunk 5: Fieldset State Variants (Medium Complexity)
**Lines: 85-97**

### What's Included:
- Dynamic state classes (error, success, warning, etc.) for fieldsets
- Border color changes for inputs
- Text color changes for small elements

### Migration Approach:
```tsx
<fieldset className={classNames(
  "base-fieldset-classes",
  error && "danger", // or "error", "success", etc.
)}>
  {/* Inputs get border color from parent */}
</fieldset>
```

Then in Tailwind config or component:
```tsx
// Need to handle state-based border colors
className={classNames(
  "border",
  error && "border-danger",
  success && "border-success",
)}
```

### Dependencies:
Chunk 4 (fieldset) - extends fieldset styles

### Components Affected:
All fieldsets with error/success states

### Notes:
- Uses SCSS `@each` loop with `$states` variable
- Need to identify all state names (danger, success, warning, info, etc.)
- May need to create a utility function for state-based classes

---

## Chunk 6: Disabled & Read-Only States (Low Complexity)
**Lines: 99-108**

### What's Included:
- `.input.disabled`, `.textarea.disabled` classes
- `:read-only` pseudo-class styles
- `.input.read-only`, `.textarea.read-only` classes

### Migration Approach:
```tsx
<input className={classNames(
  "base-input-classes",
  disabled && "disabled:cursor-not-allowed disabled:opacity-50",
  readOnly && "read-only:bg-body"
)} />
```

### Dependencies:
Chunk 3 (base inputs)

### Components Affected:
Disabled and read-only inputs

### Notes:
- Read-only uses `var(--body-bg)` - map to Tailwind `bg-body`

---

## Chunk 7: Input Wrapper Component (Medium Complexity)
**Lines: 110-142**

### What's Included:
- `.input` wrapper class (inline-flex container)
- Nested input styles (no border, flex-1, etc.)
- Fake input styles
- Disabled state handling
- Icon styles

### Migration Approach:
```tsx
<div className="inline-flex items-center gap-2 relative py-0 min-h-[form-height]">
  <input className="border-none flex-1 bg-transparent shadow-none outline-none -mx-4 max-w-none" />
  <div className="flex-1 fake-input">...</div>
  <Icon className="text-muted" />
</div>
```

### Dependencies:
Chunk 3 (base inputs) - wraps inputs

### Components Affected:
Components using `.input` wrapper class

### Notes:
- Negative margin (`-mx-4`) may need arbitrary value
- Min-height uses `$form-element-height` - need to map
- Icon color uses `text-muted` mixin

---

## Chunk 8: Select Dropdown Arrow (Medium-High Complexity)
**Lines: 144-154**

### What's Included:
- Custom dropdown arrow using background gradients
- Appearance none
- Custom padding for arrow space

### Migration Approach:
This is complex - uses CSS gradients for arrow. Options:
1. Use Tailwind's arbitrary values for background gradients
2. Use SVG icon instead (better approach)
3. Keep minimal CSS for arrow only

```tsx
<select className="appearance-none pr-[calc(padding-x+padding-x/2+1em)] bg-[linear-gradient(...)] bg-no-repeat bg-[position] bg-[size]" />
```

### Dependencies:
Chunk 3 (base inputs) - extends select

### Components Affected:
All `<select>` elements

### Notes:
- Complex gradient calculation - may be better to extract to minimal CSS
- Or replace with SVG icon approach

---

## Chunk 9: Radio & Checkbox Base (Medium Complexity)
**Lines: 156-175**

### What's Included:
- Base radio/checkbox styles (appearance, size, border, background)
- Checked state background
- Disabled state

### Migration Approach:
```tsx
<input
  type="radio" // or checkbox
  className="text-inherit cursor-pointer appearance-none w-[calc(1lh+2*border-width)] h-[calc(1lh+2*border-width)] aspect-square border bg-background flex-shrink-0 text-sm checked:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
/>
```

### Dependencies:
Chunk 3 (base inputs) - but overrides many styles

### Components Affected:
All radio and checkbox inputs

### Notes:
- Complex size calculation using `calc(1lh + 2 * border-width)`
- May need arbitrary values or CSS variable

---

## Chunk 10: Radio Button Specific (Medium Complexity)
**Lines: 177-190**

### What's Included:
- Radio border-radius (100% = circle)
- Checked state with inner circle (::after pseudo-element)

### Migration Approach:
Radio checked state uses `::after` pseudo-element - this is tricky in Tailwind. Options:
1. Use arbitrary variants: `checked:after:content-[''] checked:after:block checked:after:bg-foreground checked:after:rounded-full checked:after:h-full`
2. Extract to minimal CSS for the ::after content

```tsx
<input
  type="radio"
  className="rounded-full checked:p-[calc(spacer-2-2*border-width)] checked:after:content-[''] checked:after:block checked:after:bg-foreground checked:after:rounded-full checked:after:h-full"
/>
```

### Dependencies:
Chunk 9 (radio/checkbox base)

### Components Affected:
All radio inputs

### Notes:
- Complex padding calculation for checked state
- ::after pseudo-element styling - may need minimal CSS

---

## Chunk 11: Checkbox Specific (Medium Complexity)
**Lines: 192-200**

### What's Included:
- Checkbox border-radius
- Checked state with checkmark icon (::after with icon class)

### Migration Approach:
Checkbox uses icon class extension - need to handle checkmark display:

```tsx
<input
  type="checkbox"
  className="rounded-[border-radius-2] checked:after:block checked:after:mx-auto checked:after:[content:var(--icon-outline-check)]"
/>
```

Or use actual checkmark character/SVG.

### Dependencies:
Chunk 9 (radio/checkbox base)

### Components Affected:
All checkbox inputs (not switches)

### Notes:
- Uses `@extend %icon, .icon-outline-check` - need to handle icon display
- May need to use actual checkmark or SVG instead

---

## Chunk 12: Radio Buttons Group (Low-Medium Complexity)
**Lines: 202-214**

### What's Included:
- `.radio-buttons[role="radiogroup"]` grid layout
- Button[role="radio"] styles (extends select-button)

### Migration Approach:
```tsx
<div
  role="radiogroup"
  className="radio-buttons grid gap-4 grid-cols-[repeat(auto-fit,minmax(min(15rem,100%),1fr))]"
>
  <button role="radio" className="select-button-classes aria-checked:select-button-active-classes">
    ...
  </button>
</div>
```

### Dependencies:
- Select-button styles (need to find these)
- Chunk 9 (radio base)

### Components Affected:
Radio button groups

### Notes:
- Grid uses complex `minmax(min(size(15), 100%), 1fr)` - may need arbitrary value
- References `%select-button` and `%select-button-active` - need to find these

---

## Chunk 13: Switch/Toggle Input (High Complexity)
**Lines: 216-240**

### What's Included:
- Switch dimensions and border-radius
- Transition animations
- ::after pseudo-element for thumb
- Checked state thumb position

### Migration Approach:
Complex - uses ::after for thumb with position calculations:

```tsx
<input
  type="checkbox"
  role="switch"
  className="w-[calc(2*big-icon-size-2*padding)] h-[big-icon-size] rounded-[border-radius-3] relative transition-all after:bg-current after:rounded-[border-radius-3] after:content-[''] after:h-[calc(big-icon-size-2*padding)] after:w-[calc(big-icon-size-2*padding)] after:absolute after:top-[0.125rem] after:left-[0.1875rem] after:transition-all checked:after:left-[calc(100%-big-icon-size+padding)] checked:after:bg-accent-foreground"
/>
```

### Dependencies:
Chunk 9 (checkbox base) - but overrides heavily

### Components Affected:
Switch/toggle inputs

### Notes:
- Very complex with many calculations
- May be better to extract to minimal CSS or create a Switch component
- Uses `$big-icon-size` variable - need to map

---

## Chunk 14: Range Input (High Complexity)
**Lines: 246-289**

### What's Included:
- Range track styles (webkit and moz)
- Range thumb styles (webkit and moz)
- Custom progress gradient
- Complex vendor prefixes

### Migration Approach:
Range inputs require vendor-specific pseudo-elements that Tailwind doesn't handle well. Best approach:
1. Extract to minimal CSS file for range-specific styles
2. Or create a Range component with inline styles for vendor prefixes

This is a candidate for keeping minimal CSS due to vendor prefix complexity.

### Dependencies:
Chunk 3 (base inputs) - but heavily customized

### Components Affected:
Range/slider inputs

### Notes:
- **Recommendation: Keep minimal CSS for this** - vendor prefixes are complex
- Or create a dedicated Range component

---

## Chunk 15: Form Sections Layout (Medium-High Complexity)
**Lines: 295-332**

### What's Included:
- Form > section grid layout
- Section header styles
- First section special handling
- Responsive layout (lg breakpoint)
- Grid column layout for desktop

### Migration Approach:
```tsx
<form>
  <section className="grid py-7 border-t gap-6 first-of-type:pt-0 first-of-type:border-t-0 [&:is([role='separator']+section)]:border-t-0 lg:gap-0 lg:gap-x-8 lg:pb-[calc(spacer-7-gap)] lg:grid-cols-[25%_1fr] lg:[&>*]:mb-6 lg:[&>*]:col-[2] lg:[&>header]:col-[1/2] lg:[&>header]:row-[1/10]">
    <header className="grid gap-3 content-start">...</header>
  </section>
</form>
```

### Dependencies:
None - standalone layout

### Components Affected:
Form page layouts

### Notes:
- Complex responsive grid with column spanning
- Many arbitrary variants needed
- First-of-type and adjacent sibling selectors

---

## Chunk 16: Combobox/Datalist (High Complexity)
**Lines: 334-399**

### What's Included:
- Combobox container positioning
- Expanded input border-radius changes
- Datalist dropdown styles (position, z-index, shadow)
- Option styles (padding, cursor, flex layout)
- Focused option background
- Multiselectable selected indicator
- Section headers in datalist

### Migration Approach:
```tsx
<div className="combobox relative">
  <input
    aria-expanded={expanded}
    className={classNames(
      "base-input-classes",
      expanded && "rounded-b-none"
    )}
  />
  <datalist className={classNames(
    "block bg-background border w-full overflow-auto absolute top-full left-0 rounded-b shadow-lg z-modal py-2",
    expanded && "block" : "hidden"
  )}>
    <option className="py-2 px-4 cursor-pointer flex items-center focused:bg-primary focus:bg-primary">
      ...
    </option>
  </datalist>
</div>
```

### Dependencies:
Chunk 3 (base inputs), Chunk 7 (input wrapper)

### Components Affected:
Combobox/autocomplete components

### Notes:
- Complex positioning and z-index
- Multiselectable selected state uses icon - need to handle
- Image styles in options

---

## Chunk 17: Color Picker (Low-Medium Complexity)
**Lines: 409-427**

### What's Included:
- Color picker wrapper (position, overflow, padding, border)
- Input[type="color"] positioning (large, centered, hidden border)

### Migration Approach:
```tsx
<div className="color-picker relative overflow-hidden p-4 border rounded-lg max-w-fit">
  <input
    type="color"
    className="absolute w-[200%] h-[200%] max-w-none -left-1/2 -top-1/2 border-none cursor-pointer"
  />
</div>
```

### Dependencies:
None - standalone component

### Components Affected:
Color picker components

### Notes:
- Uses percentage-based sizing for color input overlay
- Negative positioning for centering

---

## Migration Order Recommendation

### Phase 1: Foundation (Do First)
1. **Chunk 3**: Base Input Fields - Foundation for everything
2. **Chunk 1**: Simple Utility Styles - Quick wins, no dependencies

### Phase 2: Core Components (Do Second)
3. **Chunk 2**: Label Styles
4. **Chunk 4**: Fieldset & Legend
5. **Chunk 5**: Fieldset State Variants
6. **Chunk 6**: Disabled & Read-Only States

### Phase 3: Input Variants (Do Third)
7. **Chunk 9**: Radio & Checkbox Base
8. **Chunk 10**: Radio Button Specific
9. **Chunk 11**: Checkbox Specific
10. **Chunk 13**: Switch/Toggle Input
11. **Chunk 8**: Select Dropdown Arrow

### Phase 4: Complex Components (Do Fourth)
12. **Chunk 7**: Input Wrapper Component
13. **Chunk 16**: Combobox/Datalist
14. **Chunk 15**: Form Sections Layout
15. **Chunk 12**: Radio Buttons Group

### Phase 5: Special Cases (Do Last)
16. **Chunk 14**: Range Input (Consider keeping CSS)
17. **Chunk 17**: Color Picker

---

## Key Considerations

### SCSS Variables to Map
- `$form-element-padding-y` → Tailwind padding-y
- `$form-element-padding-x` → Tailwind padding-x
- `$form-element-font-size` → Tailwind text size
- `$form-element-border-radius` → Tailwind rounded
- `$form-element-height` → Tailwind min-height
- `$border` → Tailwind border classes
- `$outline` → Tailwind outline classes
- `$disabled-opacity` → Tailwind opacity
- `spacer(n)` → Tailwind spacing scale
- `border-radius(n)` → Tailwind rounded scale
- `size(n)` → Tailwind size scale
- `$big-icon-size` → Tailwind size
- `full-color(name)` → Tailwind color classes
- `$states` → State names array

### Pseudo-elements That Need Special Handling
- `::after` for radio checked state
- `::after` for checkbox checkmark
- `::after` for switch thumb
- `::-webkit-slider-*` and `::-moz-range-*` for range inputs

### Components That May Need Minimal CSS
- Range inputs (vendor prefixes)
- Select dropdown arrow (complex gradients)
- Radio/checkbox ::after pseudo-elements (if arbitrary variants don't work)

### Testing Checklist
For each chunk, test:
- [ ] Visual appearance matches original
- [ ] All states work (hover, focus, disabled, checked, etc.)
- [ ] Responsive behavior (where applicable)
- [ ] Accessibility (keyboard navigation, screen readers)
- [ ] Browser compatibility (especially Safari for fieldset)

---

## Next Steps

1. Start with **Chunk 3** (Base Input Fields) - this is the foundation
2. Create a test page with all form elements to verify each chunk
3. Update components incrementally as you migrate each chunk
4. Document any deviations or decisions made during migration
5. Consider creating reusable form component library as you migrate

