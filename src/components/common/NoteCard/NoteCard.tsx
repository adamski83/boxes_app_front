import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import EditBoxController from "src/components/forms/EditBoxController";
import { FormController } from "../../forms/FormController";
import { useDeleteBox } from "src/services/mutations/deleteOneBox";
import { useUpdateBox } from "src/services/mutations/updateBox";
import { GET_BOXES } from "src/services/queries/tags";
import { MockDataItem } from "../../../types/mockData";
import { ApiError } from "../../../types/errorTypes";

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
    onError: (error: ApiError) => {
      console.error("Error updating box:", error);
    },
  });

  const { mutate: deleteBox } = useDeleteBox({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_BOXES] });
      console.log("Box deleted successfully");
    },
    onError: (error: ApiError) => {
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
        <EditBoxController
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
