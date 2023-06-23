import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";

import {
  Box,
  Button,
  CssBaseline,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { useMemo, useState } from "react";
import { Layout } from "./components/Layout";
import { Combobox } from "./components/Combobox";
import { PathCard } from "./components/PathCard";
import { Path } from "./components/Path";
import { AddPath } from "./components/AddPath";
import { useJsApiLoader } from "@react-google-maps/api";
import { GOOGLE_MAP_API_KEY } from "./constants";

const paths = [
  {
    id: 0,
    title: "Path title",
    shortDescription:
      "Short lorem100Minim aute ullamco officia dolor reprehenderit ullamco ad quis occaecat excepteur consequat.",
    description:
      "Eu esse mollit tempor non consequat ut anim esse aute commodo aute.",
    distance: "1.75 km",
    isFavorited: true,
  },
  {
    id: 1,
    title: "Path title",
    shortDescription:
      "Short lorem100Minim aute ullamco officia dolor reprehenderit ullamco ad quis occaecat excepteur consequat.",
    description:
      "Eu esse mollit tempor non consequat ut anim esse aute commodo aute.",
    distance: "1.75 km",
    isFavorited: true,
  },
  {
    id: 2,
    title: "Path title",
    shortDescription:
      "Short lorem100Minim aute ullamco officia dolor reprehenderit ullamco ad quis occaecat excepteur consequat.",
    description:
      "Eu esse mollit tempor non consequat ut anim esse aute commodo aute.",
    distance: "1.75 km",
    isFavorited: true,
  },
  {
    id: 3,
    title: "Path title",
    shortDescription:
      "Short lorem100Minim aute ullamco officia dolor reprehenderit ullamco ad quis occaecat excepteur consequat.",
    description:
      "Eu esse mollit tempor non consequat ut anim esse aute commodo aute.",
    distance: "1.75 km",
    isFavorited: true,
  },
  {
    id: 4,
    title: "Path title",
    shortDescription:
      "Short lorem100Minim aute ullamco officia dolor reprehenderit ullamco ad quis occaecat excepteur consequat.",
    description:
      "Eu esse mollit tempor non consequat ut anim esse aute commodo aute.",
    distance: "1.75 km",
    isFavorited: true,
  },
  {
    id: 5,
    title: "Path title",
    shortDescription:
      "Short lorem100Minim aute ullamco officia dolor reprehenderit ullamco ad quis occaecat excepteur consequat.",
    description:
      "Eu esse mollit tempor non consequat ut anim esse aute commodo aute.",
    distance: "1.75 km",
    isFavorited: true,
  },
  {
    id: 6,
    title: "Path title",
    shortDescription:
      "Short lorem100Minim aute ullamco officia dolor reprehenderit ullamco ad quis occaecat excepteur consequat.",
    description:
      "Eu esse mollit tempor non consequat ut anim esse aute commodo aute.",
    distance: "1.75 km",
    isFavorited: true,
  },
];

export const App = () => {
  const [activePathId, setActivePathId] = useState<null | number>(null);
  const [addPathDialogOpen, setAddPathDialogOpen] = useState(false);

  const activePath = useMemo(
    () => paths.find((route) => route.id === activePathId),
    [activePathId]
  );

  const createPathCardClickHandler = (pathId: number) => () => {
    if (activePathId !== pathId) setActivePathId(pathId);
  };

  const openAddPathDialog = () => setAddPathDialogOpen(true);
  const closeAddPathDialog = () => setAddPathDialogOpen(false);

  return (
    <>
      <CssBaseline />
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
          <AddPath />
        </DialogContent>
      </Dialog>
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
            <Combobox options={paths} />
            <Box
              marginTop={2}
              maxHeight={500}
              overflow="auto"
              display="flex"
              flexDirection="column"
              gap={1.5}
            >
              {paths.map(({ id, ...route }) => (
                <PathCard
                  isActive={id === activePathId}
                  onClick={createPathCardClickHandler(id)}
                  {...route}
                  key={id}
                />
              ))}
            </Box>
          </>
        }
        right={activePath && <Path {...activePath} />}
      />
    </>
  );
};
