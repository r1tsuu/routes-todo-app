import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Alert,
  Box,
  Button,
  Grid,
  Snackbar,
  TextField,
  TextFieldProps,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { PathMap } from "./PathMap";
import { LatLng } from "../types";
import { distanceToString } from "../services/directions";
import { Controller, useForm } from "react-hook-form";
import { i18n } from "../constants/i18n";
import { useDisclosure } from "../hooks/useDisclosure";

const Field = ({ children, label }: { children: React.ReactNode; label: string }) => {
  return (
    <Box display="flex" flexDirection="column">
      <Typography typography="body1">{label}</Typography>
      {children}
    </Box>
  );
};

const createPathFormSchema = yup.object().shape({
  title: yup.string().required(i18n.required),
  shortDescription: yup.string().required(i18n.required).max(160),
  description: yup.string().required(i18n.required),
});

interface CreatePathFormFields {
  title: string;
  shortDescription: string;
  description: string;
}

interface CreatePathProps {
  onSubmit: (
    params: {
      points: LatLng[];
      distance: number;
    } & CreatePathFormFields
  ) => void;
}

export const CreatePath = ({ onSubmit }: CreatePathProps) => {
  const [pathMapData, setPathMapData] = useState<{
    points: LatLng[];
    distance: number | null;
  }>({
    points: [],
    distance: null,
  });

  const {
    isOpen: isPointsLengthAlertOpen,
    onOpen: onPointsLengthAlertOpen,
    onClose: onPointsLengthAlertClose,
  } = useDisclosure();

  const { control, handleSubmit } = useForm<CreatePathFormFields>({
    resolver: yupResolver(createPathFormSchema),
  });

  const { points, distance = 0 } = pathMapData;

  const submit = (data: CreatePathFormFields) => {
    if (pathMapData.points.length > 1 && distance !== null)
      onSubmit({
        ...data,
        points,
        distance,
      });
    else onPointsLengthAlertOpen();
  };

  const textFields = [
    {
      name: "title",
    },
    {
      name: "shortDescription",
      props: {
        minRows: 3,
      },
    },
    {
      name: "description",
      props: {
        minRows: 5,
        InputProps: {
          inputComponent: TextareaAutosize,
        },
      },
    },
  ];

  return (
    <>
      <Grid container spacing={3} component="form" onSubmit={handleSubmit(submit)}>
        <Grid item xs={6} display="flex" flexDirection="column" gap={6}>
          <Box display="flex" flexDirection="column" gap={2}>
            {textFields.map(({ name, props = {} }) => (
              <Controller
                key={name}
                name={name as "title" | "shortDescription" | "description"}
                control={control}
                render={({ field, fieldState }) => (
                  <Field label={i18n.title}>
                    <TextField
                      {...field}
                      helperText={fieldState.error?.message}
                      error={!!fieldState.error?.message}
                      {...props}
                    />
                  </Field>
                )}
              />
            ))}
          </Box>
          <Box display="flex" flexDirection="column" gap={6} alignItems="center">
            <Typography typography="h4">Length {distanceToString(distance)}</Typography>
            <Button size="large" variant="contained" type="submit">
              {i18n.addPath}
            </Button>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <PathMap points={points} onChange={setPathMapData} />
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={isPointsLengthAlertOpen}
        autoHideDuration={3000}
        onClose={onPointsLengthAlertClose}
      >
        <Alert onClose={onPointsLengthAlertClose}>Create at least 2 points</Alert>
      </Snackbar>
    </>
  );
};
