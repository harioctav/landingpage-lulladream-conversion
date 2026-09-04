import { blobNames, blobPaths } from '@/lib/blobPaths'

/**
 * Renders the photo-silhouette clipPath defs once, near the root. Produces no
 * visual output of its own; components reference the shapes by id through the
 * `blob-*` utilities.
 */
export default function BlobDefs() {
  return (
    <svg aria-hidden="true" focusable="false" width="0" height="0" className="absolute">
      <defs>
        {blobNames.map((name) => (
          <clipPath key={name} id={`blob-${name}`} clipPathUnits="objectBoundingBox">
            <path d={blobPaths[name]} />
          </clipPath>
        ))}
      </defs>
    </svg>
  )
}
