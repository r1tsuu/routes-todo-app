import { useMemo, useState } from "react";
import { matchSorter } from "match-sorter";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import Close from "@mui/icons-material/Close";
import {
  Box,
  Button,
  CssBaseline,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";

import { BottomAlert } from "./components/BottomAlert";
import { Layout } from "./components/Layout";
import { SearchField } from "./components/SearchField";
import { PathCard } from "./components/PathCard";
import { Path } from "./components/Path";
import { CreatePath } from "./components/CreatePath";

import { usePathsApi } from "./services/pathsApi";

import { useActionAlerts } from "./hooks/useActionAlerts";
import { useDisclosure } from "./hooks/useDisclosure";

import { CreatePathParams } from "./types";

export const App = () => {
  const [activePathId, setActivePathId] = useState<null | string>(null);
  const [search, setSearch] = useState("");

  const alerts = useActionAlerts();
  const createPathDialog = useDisclosure();

  const { paths, createPath, updatePath, deletePath } = usePathsApi();

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
          alerts.openDelete();
        },
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePathId, paths]);

  const createClickPathHandler = (pathId: string) => () => {
    if (activePathId !== pathId) setActivePathId(pathId);
  };

  const handleCreatePathSubmit = async (data: CreatePathParams) => {
    const res = await createPath(data);

    if ("data" in res && res.data) {
      createPathDialog.onClose();
      alerts.openCreate();
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
              onClick={createPathDialog.onOpen}
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
        onClose={createPathDialog.onClose}
        open={createPathDialog.isOpen}
        color="grey.800"
      >
        <DialogTitle>
          <Box
            display="flex"
            justifyContent={"space-between"}
            alignItems="center"
          >
            <span>Add new path</span>
            <IconButton onClick={createPathDialog.onClose}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <CreatePath onSubmit={handleCreatePathSubmit} />
        </DialogContent>
      </Dialog>
      {alerts.list.map((props, index) => (
        <BottomAlert key={index} {...props} />
      ))}
    </>
  );
};
