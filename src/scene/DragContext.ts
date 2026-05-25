import { createContext, useContext } from 'react';

/**
 * Lets a `<Face>` ask "was the user dragging when this click fired?"
 * so we can suppress the navigation on drag-end.
 */
export const DragContext = createContext<{ getWasDragging: () => boolean }>({
  getWasDragging: () => false,
});

export const useDrag = () => useContext(DragContext);
