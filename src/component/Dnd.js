import React, { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import { Menu } from "antd";

const Dnd = () => {
  const [items, setItems] = useState([
    { id: "1", title: "할 일 1" },
    { id: "2", title: "할 일 2" },
    { id: "3", title: "할 일 3" },
    { id: "4", title: "할 일 4" },
  ]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      setItems(arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <div style={{ padding: "20px", background: "#FFF5FB" }}>
      <h2 style={{ color: "#D1A7E1" }}>드래그 앤 드롭 리스트</h2>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={items.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          <Menu
            style={{
              width: "100%",
              background: "#F4E6F1",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            {items.map((item) => (
              <SortableItem key={item.id} id={item.id} title={item.title} />
            ))}
          </Menu>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default Dnd;
