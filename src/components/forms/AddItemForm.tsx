import { zodResolver } from "@hookform/resolvers/zod";
import { Delete, PhotoCamera } from "@mui/icons-material";
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useAddNewBox } from "src/services/mutations/addNewBox";
import { GET_BOXES } from "src/services/queries/tags";
import { MockDataItem } from "src/types";
import { storageOptions } from "../../constants/storageOpitons";
import { ProductCategory } from "../../types/productCategoryType";
import { createBoxSchema } from "./BoxValidation";
import { FormInput } from "./FormInput";
import { FormSelect } from "./FormSelect";

const categoryOptions = Object.values(ProductCategory);

const BoxForm: React.FC = () => {
  const { t } = useTranslation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const methods = useForm<MockDataItem>({
    resolver: zodResolver(createBoxSchema()),
    defaultValues: {
      name: "",
      amount: 0,
      usage: "",
      storage: "Warehouse A",
      category: ProductCategory.BOX,
      status: "TODO",
      uploaded_file: "",
    },
  });

  const queryClient = useQueryClient();

  const { mutate: addNewBox } = useAddNewBox({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_BOXES] });
      handleReset();
    },
    onError: (error: any) => {
      console.error("Error adding box:", error);
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Proszę wybrać plik obrazu");
        return;
      }

      if (file.size > 15 * 1024 * 1024) {
        alert("Plik jest za duży. Maksymalny rozmiar to 15MB");
        return;
      }

      setSelectedFile(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      methods.setValue("uploaded_file", file.name);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    methods.setValue("uploaded_file", "");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleReset = () => {
    methods.reset({
      name: "",
      amount: 0,
      usage: "",
      storage: "Warehouse A",
      status: "TODO",
      category: ProductCategory.BOX,
      uploaded_file: "",
    });
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmitHandler = (data: MockDataItem): void => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (key !== "uploaded_file") {
        formData.append(key, String(data[key as keyof MockDataItem]));
      }
    });

    if (selectedFile) {
      formData.append("uploaded_file", selectedFile);
    }

    addNewBox(formData);

    console.log("Przesyłane dane:", {
      ...data,
      file: selectedFile ? selectedFile.name : "Brak pliku",
    });
  };

  return (
    <FormProvider {...methods}>
      <Box>
        <form onSubmit={methods.handleSubmit(onSubmitHandler)}>
          <Stack
            direction={{ xs: "column", sm: "column", md: "row" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            sx={{ mb: 2 }}
          >
            <FormInput autoComplete="on" name="name" label={t("form.name")} />
            <FormInput
              autoComplete="on"
              name="amount"
              label={t("form.amount")}
              type="number"
            />
            <FormInput autoComplete="on" name="usage" label={t("form.usage")} />
            <FormSelect
              name="category"
              label={t("form.category")}
              options={categoryOptions}
            />
            <FormSelect
              name="storage"
              label={t("form.storage")}
              options={storageOptions}
            />
          </Stack>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            alignItems="center"
            sx={{ mb: 2 }}
          >
            <Button
              variant="outlined"
              component="label"
              startIcon={<PhotoCamera />}
              sx={{
                minHeight: 56,
                textTransform: "none",
                minWidth: 150,
              }}
            >
              {selectedFile ? t("form.changeFile") : t("form.file")}
              <input
                ref={fileInputRef}
                type="file"
                hidden
                accept="image/*"
                onChange={handleFileChange}
              />
            </Button>

            {selectedFile && (
              <Stack direction="row" spacing={1} alignItems="center">
                {previewUrl && (
                  <Avatar
                    src={previewUrl}
                    alt="Podgląd"
                    sx={{ width: 56, height: 56 }}
                    variant="rounded"
                  />
                )}
                <Box>
                  <Typography variant="body2" noWrap sx={{ maxWidth: 200 }}>
                    {selectedFile.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </Typography>
                </Box>
                <Button
                  size="small"
                  color="error"
                  onClick={handleRemoveFile}
                  startIcon={<Delete />}
                >
                  {t("form.remove")}
                </Button>
              </Stack>
            )}
          </Stack>

          <Stack direction="row" spacing={2}>
            <Button type="submit" variant="contained" size="medium">
              {t("form.add")}
            </Button>
            <Button
              type="button"
              variant="outlined"
              size="medium"
              onClick={handleReset}
            >
              {t("form.reset")}
            </Button>
          </Stack>
        </form>
      </Box>
    </FormProvider>
  );
};

export default BoxForm;
