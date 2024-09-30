import { useState } from "react";
import { MockDataItem } from "src/types";
import { SubmitHandler } from "react-hook-form";
import { useUpdateBox } from "src/services/mutations/updateBox";
import { useQueryClient } from "@tanstack/react-query";
import { GET_BOXES } from "src/services/queries/tags";
import { useDeleteBox } from "src/services/mutations/deleteOneBox";
import { FormController } from "src/components/form/FormController";
import EditFormController from "src/components/form/EditFormController";

interface Props {
  item: MockDataItem;
}

const NoteCard = ({ item }: Props) => {
  const [isEditing, setIsEditing] = useState(true);
  const queryClient = useQueryClient();

  const { mutate: updateBox } = useUpdateBox({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_BOXES] });
      console.log("Box updated successfully");
    },
    onError: (error) => {
      console.error("Error updating box:", error);
    },
  });

  const { mutate: deleteBox } = useDeleteBox({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_BOXES] });
      console.log("Box deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting box:", error);
    },
  });

  const toggleEdit = () => {
    setIsEditing((isEditing) => !isEditing);
  };

  const deleteItemHandler = (id: string | undefined) => (): void => {
    if (!id) return;
    deleteBox(id);
  };

  const onSubmit: SubmitHandler<MockDataItem> = (item) => {
    updateBox(item);

    setIsEditing((isEditing) => !isEditing);
  };

  return (
    <div>
      {isEditing ? (
        <FormController
          item={item}
          deleteItemHandler={deleteItemHandler}
          toggleEdit={toggleEdit}
        />
      ) : (
        <EditFormController
          onSubmit={onSubmit}
          deleteItemHandler={deleteItemHandler}
          item={item}
          toggleEdit={toggleEdit}
        />
      )}
    </div>
  );
};

export default NoteCard;
