import {
  FunctionComponent,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import {
  DragDropContext,
  Droppable,
  DroppableProps,
  Draggable,
  OnDragEndResponder,
} from "@hello-pangea/dnd";

export const DndContainer: FunctionComponent<
  PropsWithChildren<{
    onDragEnd: OnDragEndResponder;
  }>
> = ({ children, onDragEnd }) => {
  return <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>;
};

export const StrictModeDroppable = ({ children, ...props }: DroppableProps) => {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);
  if (!enabled) {
    return null;
  }
  return <Droppable {...props}>{children}</Droppable>;
};
