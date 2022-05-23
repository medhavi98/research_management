import { Button, Grid, Typography } from "@mui/material";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
const Submissions = () => {
  return (
    <>
      <Grid>
        <Grid container>
          <Grid item md={8}>
            <Typography variant="h6">Introduction to the Research</Typography>
            <Typography variant="h6" mt={4}>
              Learn how to create a SRS
            </Typography>
            <Typography variant="h6" mt={4}>
              Sample charter document
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

export default Submissions;
