export function Text({
  description,
  label,
}: {
  description?: string;
  label?: string;
}) {
  if (!description) return null;
  const optionalLabel = (
    <>
      <strong>{label}:</strong>&nbsp;
    </>
  );
  return (
    <p>
      {label ? optionalLabel : null}
      {description}
    </p>
  );
}
