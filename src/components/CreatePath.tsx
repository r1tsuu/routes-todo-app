import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

import {
  Alert,
  Box,
  Button,
  Grid,
  Snackbar,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { PathMap } from "./PathMap";
import { distanceToString } from "../services/directions";
import { useDisclosure } from "../hooks/useDisclosure";

import { CreatePathParams, LatLng } from "../types";

const Field = ({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) => {
  return (
    <Box display="flex" flexDirection="column">
      <Typography typography="body1">{label}</Typography>
      {children}
    </Box>
  );
};

const requiredMsg = "The field is required";

const createPathFormSchema = yup.object().shape({
  title: yup.string().required(requiredMsg),
  shortDescription: yup
    .string()
    .required(requiredMsg)
    .max(160, "Max length of the field is 160 symbols"),
  description: yup.string().required(requiredMsg),
});

interface CreatePathFormFields {
  title: string;
  shortDescription: string;
  description: string;
}

interface CreatePathProps {
  onSubmit: (params: CreatePathParams) => void;
}

export const CreatePath = ({ onSubmit }: CreatePathProps) => {
  const [pathMapData, setPathMapData] = useState<{
    points: LatLng[];
    distance: number | null;
  }>({
    points: [],
    distance: null,
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const pointsLengthAlert = useDisclosure();

  const { control, handleSubmit } = useForm<CreatePathFormFields>({
    resolver: yupResolver(createPathFormSchema),
  });

  const { points, distance = 0 } = pathMapData;

  const submit = (data: CreatePathFormFields) => {
    if (pathMapData.points.length > 1 && distance !== null)
      onSubmit({
        ...data,
        points,
        distance: distanceToString(distance),
      });
    else pointsLengthAlert.onOpen();
  };

  const textFields = [
    {
      name: "title",
      label: "Title",
    },
    {
      name: "shortDescription",
      label: "Short description",
      props: {
        rows: 2,
        multiline: true,
      },
    },
    {
      name: "description",
      label: "Description",
      props: {
        multiline: true,
        minRows: 4,
      },
    },
  ];

  return (
    <>
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          lg={6}
          display="flex"
          flexDirection="column"
          gap={6}
          sx={{
            gap: {
              xs: 3,
              lg: 6,
            },
          }}
          component="form"
          onSubmit={handleSubmit(submit)}
        >
          <Box display="flex" flexDirection="column" gap={2}>
            {textFields.map(({ name, label, props = {} }) => (
              <Controller
                key={name}
                name={name as "title" | "shortDescription" | "description"}
                control={control}
                render={({ field, fieldState }) => (
                  <Field label={label}>
                    <TextField
                      variant="outlined"
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
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            sx={{
              gap: {
                xs: 3,
              },
            }}
          >
            {distance && (
              <Typography typography="h4">
                Length {distanceToString(distance)}
              </Typography>
            )}
            <Button
              size="large"
              variant="contained"
              type="submit"
              fullWidth={isMobile}
            >
              Add path
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <PathMap
            mapContainerStyles={{
              width: "100%",
              height: isMobile ? 400 : 580,
            }}
            editable
            points={points}
            onChange={setPathMapData}
          />
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={pointsLengthAlert.isOpen}
        autoHideDuration={3000}
        onClose={pointsLengthAlert.onClose}
      >
        <Alert severity="warning" onClose={pointsLengthAlert.onClose}>
          Create at least 2 points
        </Alert>
      </Snackbar>
    </>
  );
};
