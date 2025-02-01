export function Text({
  description,
  label,
  textClass,
}: {
  description?: string;
  label?: string;
  textClass?: string;
}) {
  if (!description) return null;
  const optionalLabel = (
    <>
      <strong>{label}:</strong>&nbsp;
    </>
  );
  const optionalClassName = textClass
    ? {
        className: textClass,
      }
    : {};
  return (
    <p {...optionalClassName}>
      {label ? optionalLabel : null}
      {description}
    </p>
  );
}
