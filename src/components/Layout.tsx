import { Container, Grid, Box } from "@mui/material";

interface LayoutProps {
  top: React.ReactNode;
  left: React.ReactNode;
  right: React.ReactNode;
}

export const Layout = ({ top, left, right }: LayoutProps) => {
  return (
    <Container sx={{ paddingY: 3 }}>
      <Box
        display={"flex"}
        justifyContent="space-between"
        paddingBottom={3}
        borderBottom="1px solid"
        borderColor={"grey.500"}
        color={"grey.800"}
      >
        {top}
      </Box>
      <Grid
        paddingTop={3}
        container
        sx={{
          gap: {
            xs: 4,
            lg: 0,
          },
        }}
      >
        <Grid
          item
          xs={12}
          lg={6}
          sx={{
            paddingRight: {
              lg: 4,
            },
            borderWidth: "1px",
            borderColor: "grey.500",
            borderRightStyle: {
              lg: "solid",
            },
          }}
        >
          {left}
        </Grid>
        <Grid
          sx={{
            paddingLeft: {
              lg: 4,
            },
          }}
          maxHeight={600}
          overflow={"auto"}
          paddingRight={4}
          item
          xs={12}
          lg={6}
        >
          {right}
        </Grid>
      </Grid>
    </Container>
  );
};
