export function Text({
  description,
  label,
  variant,
}: {
  description?: string;
  label?: string;
  variant?: string;
}) {
  if (!description) return null;
  const optionalLabel = (
    <>
      <span className="label">{label}:</span>&nbsp;
    </>
  );

  return (
    <p className={`text${variant ? ` ${variant}` : ''}`}>
      {label ? optionalLabel : null}
      {description}
    </p>
  );
}
