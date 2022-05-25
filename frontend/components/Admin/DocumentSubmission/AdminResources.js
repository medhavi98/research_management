import { Button, Grid, Typography } from "@mui/material";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
const AdminResources = () => {
  return (
    <>
      <Grid>
        <Grid container>
          <Grid item md={8}>
            <Typography variant="h6">Submit research topic</Typography>
            <Typography variant="h6" mt={4}>
              Charter submission
            </Typography>
            <Typography variant="h6" mt={4}>
              Presentation submissions
            </Typography>
          </Grid>
          <Grid item md={4}>
            <Grid>
              <Button
                variant="contained"
                color="success"
                component="label"
                startIcon={<DriveFolderUploadIcon />}
              >
                <input type="file" />
              </Button>
            </Grid>
            <Grid mt={3}>
              <Button
                variant="contained"
                color="success"
                component="label"
                startIcon={<DriveFolderUploadIcon />}
              >
                <input type="file" />
              </Button>
            </Grid>
            <Grid mt={3}>
              <Button
                variant="contained"
                color="success"
                component="label"
                startIcon={<DriveFolderUploadIcon />}
              >
                <input type="file" />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default AdminResources;
