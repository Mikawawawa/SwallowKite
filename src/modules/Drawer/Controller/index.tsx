import { Alert, Button, Stack } from "@mui/joy";
import { Box } from "@mui/material";
import { FunctionComponent, useCallback, useState } from "react";
import {
  TextureLayerForRender,
  useLayerManager,
} from "@/hooks/useLayerReducer";

import { LayerConfig, LayerPreview } from "./Config";
import { Layer, LayerInitializer } from "./Layer";
import { StrictModeDroppable } from "@/components/DragSortable/Container";

import update from "immutability-helper";
import { DragDropContext, Draggable } from "@hello-pangea/dnd";

export const LayerController: FunctionComponent<{
  helper: ReturnType<typeof useLayerManager>;
  onChange: (id: string, value: TextureLayerForRender) => void;
}> = ({ helper, onChange }) => {
  const { layers: data, addLayer, removeLayer, setLayers } = helper;

  const [focusedLayerIndex, setFocusedLayerIndex] = useState<null | number>(
    null
  );

  const handleUpdate = useCallback(
    (id: string, data: any) => {
      onChange(id, data);
    },
    [onChange]
  );

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragAt = data.length - dragIndex;
      const hoverAt = data.length - hoverIndex;

      setLayers(
        update(data, {
          $splice: [
            [dragAt, 1],
            [hoverAt, 0, data[dragAt]],
          ],
        })
      );
    },
    [data]
  );

  return (
    <Stack
      direction="column"
      sx={{
        width: "320px",
        "::webkit-scroll": {
          display: "none",
        },
        // overflowY: "visible",
        // overflowX: "auto",
        // minHeight: "100%",
      }}
      spacing={2}
    >
      {Array.isArray(data) && data?.length === 0 && (
        <Alert variant="soft" color="warning">
          从添加一个图层开始设计吧
        </Alert>
      )}

      {Array.isArray(data) && (
        <Button
          // @ts-ignore
          onClick={() => addLayer({})}
          variant="soft"
          sx={{
            position: "sticky",
            bottom: 0,
            padding: 2,
            transition: "all 0.3s",
          }}
        >
          添加新图层
        </Button>
      )}
      <DragDropContext
        onDragEnd={(result) => {
          if (!result.destination) {
            return;
          }
          moveCard(result.source.index, result.destination.index);
        }}
      >
        <StrictModeDroppable droppableId="droppable">
          {(provided, snapshot) => (
            <Stack
              {...provided.droppableProps}
              ref={provided.innerRef}
              direction={"column-reverse"}
              spacing={1}
              sx={{
                width: "320px",
              }}
            >
              {data?.map?.((item, index) => {
                const selected = focusedLayerIndex === index;

                return (
                  <Draggable
                    key={item.id}
                    draggableId={item.id}
                    index={data.length - index}
                  >
                    {(provided, snapshot) => (
                      <Box
                        component={"div"}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        sx={provided.draggableProps.style}
                      >
                        {!item.type ? (
                          <LayerInitializer
                            key={index}
                            item={item}
                            index={index}
                            onDelete={() => {
                              removeLayer(item.id);
                            }}
                            setType={(type) => {
                              handleUpdate(item.id, {
                                ...item,
                                type,
                                props: {},
                              });
                            }}
                          />
                        ) : (
                          <Layer
                            key={`${item.id}-${index}`}
                            item={item}
                            index={index}
                            selected={selected}
                            setSelected={setFocusedLayerIndex}
                            onDelete={() => {
                              removeLayer(item.id);
                            }}
                            dragHandlerProps={provided.dragHandleProps}
                            onChange={(value: any) => {
                              handleUpdate(item.id, {
                                ...item,
                                ...value,
                              });
                            }}
                            configor={<LayerPreview layer={data[index]} />}
                          >
                            <LayerConfig
                              layer={data[index]}
                              onChange={(value: any) => {
                                handleUpdate(item.id, {
                                  ...item,
                                  props: {
                                    ...item.props,
                                    ...value,
                                  },
                                });
                              }}
                            />
                          </Layer>
                        )}
                      </Box>
                    )}
                  </Draggable>
                );
              })}
            </Stack>
          )}
        </StrictModeDroppable>
      </DragDropContext>
    </Stack>
  );
};
