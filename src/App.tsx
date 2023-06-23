import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import { matchSorter } from "match-sorter";

import {
  Box,
  Button,
  CssBaseline,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Snackbar,
  Alert,
} from "@mui/material";
import { useMemo, useState } from "react";
import { Layout } from "./components/Layout";

import { SearchField } from "./components/SearchField";
import { PathCard } from "./components/PathCard";
import { Path } from "./components/Path";
import { CreatePath } from "./components/CreatePath";
import {
  useCreatePathMutation,
  useDeletePathMutation,
  useFetchPathsQuery,
  useUpdatePathMutation,
} from "./services/pathsApi";
import { CreatePathParams } from "./types";
import { useDisclosure } from "./hooks/useDisclosure";
import { useActionAlerts } from "./hooks/useActionAlerts";

export const App = () => {
  const [activePathId, setActivePathId] = useState<null | string>(null);
  const [addPathDialogOpen, setAddPathDialogOpen] = useState(false);
  const { data: paths } = useFetchPathsQuery();
  const [createPath] = useCreatePathMutation();
  const [updatePath] = useUpdatePathMutation();
  const [deletePath] = useDeletePathMutation();

  const alerts = useActionAlerts();

  const [search, setSearch] = useState("");

  const filteredPaths = useMemo(
    () =>
      paths && search
        ? matchSorter(paths, search, { keys: ["title", "description"] })
        : paths,
    [search, paths]
  );

  const activePath = useMemo(() => {
    if (paths && activePathId) {
      const path = paths.find((route) => route.id === activePathId);
      if (!path) return null;
      const { id, inFavorites, ...rest } = path;
      return {
        id,
        inFavorites,
        ...rest,
        onFavoriteToggle: async () => {
          await updatePath({
            id,
            inFavorites: !inFavorites,
          });
          alerts.openUpdate();
        },
        onDelete: async () => {
          await deletePath(id);
          alerts.opneDelete();
        },
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePathId, paths]);

  const createClickPathHandler = (pathId: string) => () => {
    if (activePathId !== pathId) setActivePathId(pathId);
  };

  const openAddPathDialog = () => setAddPathDialogOpen(true);
  const closeAddPathDialog = () => setAddPathDialogOpen(false);

  const handleCreatePathSubmit = async (data: CreatePathParams) => {
    const res = await createPath(data);
    closeAddPathDialog();
    alerts.openCreate();

    if ("data" in res && res.data) {
      setActivePathId(res.data);
    }
  };

  return (
    <>
      <CssBaseline />
      <Layout
        top={
          <>
            <Box display="flex" alignItems="center" gap={2}>
              <ZoomOutMapIcon
                sx={{
                  fontSize: 48,
                }}
              />
              <Typography component={"h1"} typography="h3">
                Saunter
              </Typography>
            </Box>
            <Button
              variant="contained"
              fullWidth
              sx={{
                maxWidth: 180,
              }}
              onClick={openAddPathDialog}
            >
              Add path
            </Button>
          </>
        }
        left={
          <>
            <SearchField value={search} onChange={setSearch} />
            <Box
              marginTop={2}
              overflow="auto"
              display="flex"
              flexDirection="column"
              gap={1.5}
              paddingRight={2}
              sx={{
                maxHeight: {
                  xs: "50vh",
                  lg: "530px",
                },
              }}
            >
              {filteredPaths
                ? filteredPaths.map(({ id, ...data }) => (
                    <PathCard
                      isActive={id === activePathId}
                      onClick={createClickPathHandler(id)}
                      key={id}
                      {...data}
                    />
                  ))
                : "Loading"}
            </Box>
          </>
        }
        right={activePath && <Path {...activePath} />}
      />
      <Dialog
        maxWidth="lg"
        fullWidth
        aria-labelledby="add-new-path"
        onClose={closeAddPathDialog}
        open={addPathDialogOpen}
        color="grey.800"
      >
        <DialogTitle>Add new path</DialogTitle>
        <DialogContent dividers>
          <CreatePath onSubmit={handleCreatePathSubmit} />
        </DialogContent>
      </Dialog>
      {alerts.list.map(({ title, ...props }, index) => (
        <Snackbar
          key={index}
          autoHideDuration={2500}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          {...props}
        >
          <Alert severity="success" {...props}>
            {title}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
};
