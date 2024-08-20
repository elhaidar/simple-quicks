import React, {
  KeyboardEvent,
  MutableRefObject,
  useEffect,
  useState,
} from "react";
import { TitleComponentProps } from "./task-item";

interface EditableProps {
  text: string;
  type: "textarea" | "input";
  placeholder: string;
  children: React.ReactNode;
  ViewComponent?: React.ReactElement<TitleComponentProps>;
  childRef: MutableRefObject<any>;
  initialEditing?: boolean;
}

export function Editable({
  text,
  type,
  placeholder,
  children,
  ViewComponent,
  childRef,
  initialEditing,
}: EditableProps) {
  const [isEditing, setEditing] = useState(
    initialEditing ? initialEditing : false
  );

  useEffect(() => {
    if (childRef && childRef.current && isEditing === true) {
      childRef.current.focus();
      const length = text.length;
      childRef.current.setSelectionRange(length, length);
    }
  }, [isEditing, childRef]);

  const handleKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
    type: string
  ) => {
    const { key } = event;
    const keys = ["Escape", "Tab"];
    const enterKey = "Enter";
    const allKeys = [...keys, enterKey];
    if (
      ((type === "textarea" || type === "input") && keys.indexOf(key) > -1) ||
      (type !== "textarea" && allKeys.indexOf(key) > -1)
    ) {
      setEditing(false);
    }
  };

  return (
    <>
      {isEditing ? (
        <div
          onBlur={() => setEditing(false)}
          onKeyDown={(e) => handleKeyDown(e, type)}
          className="w-full"
        >
          {children}
        </div>
      ) : ViewComponent ? (
        React.cloneElement(ViewComponent, {
          onClick: () => {
            setEditing(true);
            childRef?.current?.focus();
            const length = text.length;
            childRef?.current?.setSelectionRange(length, length);
          },
        })
      ) : (
        <div
          onClick={(e) => {
            e.preventDefault();
            setEditing(true);
            childRef?.current?.focus();
            const length = text.length;
            childRef?.current?.setSelectionRange(length, length);
          }}
          className="w-full"
        >
          <span>{text || placeholder}</span>
        </div>
      )}
    </>
  );
}
