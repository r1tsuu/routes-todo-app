import { Container, Grid, Box } from "@mui/material";

interface LayoutProps {
  top: React.ReactNode;
  left: React.ReactNode;
  right: React.ReactNode;
}

export const Layout = ({ top, left, right }: LayoutProps) => {
  return (
    <Container>
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
      <Grid paddingTop={3} container spacing={4}>
        <Grid item xs={6}>
          {left}
        </Grid>
        <Grid item xs={6}>
          {right}
        </Grid>
      </Grid>
    </Container>
  );
};
