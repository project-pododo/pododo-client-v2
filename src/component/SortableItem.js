import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Menu } from "antd";
import { HolderOutlined } from "@ant-design/icons";

const SortableItem = ({ id, title }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: String(id) });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    display: "flex",
    alignItems: "center",
    padding: "10px",
    background: "#ffffff",
    borderRadius: "8px",
    marginBottom: "8px",
    cursor: "grab",
    border: "1px solid #D1A7E1",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Menu.Item>
        <HolderOutlined style={{ marginRight: "10px", color: "#D1A7E1" }} />
        {title}
      </Menu.Item>
    </div>
  );
};

export default SortableItem;
