import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "md" | "lg";

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

type ButtonAsButton = BaseProps &
  React.ComponentPropsWithRef<"button"> & { href?: undefined };

type ButtonAsLink = BaseProps &
  React.ComponentPropsWithRef<"a"> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variants: Record<ButtonVariant, string> = {
  primary: "bg-ink text-paper hover:bg-cobalt hover:text-cobalt-ink",
  secondary: "border border-ink/25 text-ink hover:border-ink hover:bg-ink/5",
};

const sizes: Record<ButtonSize, string> = {
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );

  if (props.href !== undefined) {
    return <a className={classes} {...props} />;
  }

  return <button type="button" className={classes} {...props} />;
}
