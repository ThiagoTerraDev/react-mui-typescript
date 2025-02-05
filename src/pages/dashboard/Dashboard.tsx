import { useEffect, useState } from "react";
import { SearchToolbar } from "../../shared/components";
import { BasePageLayout } from "../../shared/layouts";
import { CitiesService } from "../../shared/services/api/cities/CitiesService";
import { MembersService } from "../../shared/services/api/members/MembersService";
import { Box, Card, CardContent, CircularProgress, Typography,  } from "@mui/material";
import Grid from "@mui/material/Grid2";

export const Dashboard = () => {
  const [isLoadingCities, setIsLoadingCities] = useState<boolean>(true);
  const [isLoadingMembers, setIsLoadingMembers] = useState<boolean>(true);

  const [numberOfCities, setNumberOfCities] = useState<number>(0);
  const [numberOfMembers, setNumberOfMembers] = useState<number>(0);

  useEffect(() => {
    CitiesService.getAll()
      .then((result) => {
        setIsLoadingCities(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          setNumberOfCities(result.totalCount);
        }
      });

    MembersService.getAll()
      .then((result) => {
        setIsLoadingMembers(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          setNumberOfMembers(result.totalCount);
        }
      });
  }, []);

  return (
    <BasePageLayout 
      title="Home" 
      toolbar={(
        <SearchToolbar 
          showNewButton={false}
        />
      )}
    >
      <Box width="100%" display="flex">
        <Grid container margin={1.1} display="flex" flexGrow={1}>
          <Grid container spacing={2} display="flex" flexGrow={1}>

            <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
              <Card>
                <CardContent>
                  <Typography variant="h5" align="center">
                    Total Cities
                  </Typography>
                  <Box padding={6} display="flex" justifyContent="center" alignItems="center">
                    {isLoadingCities ? (
                      <Typography variant="h6">
                        <CircularProgress />
                      </Typography>
                    ) : (
                      <Typography variant="h1">
                        {numberOfCities}
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
              <Card>
                <CardContent>
                  <Typography variant="h5" align="center">
                    Total Members
                  </Typography>
                  <Box padding={6} display="flex" justifyContent="center" alignItems="center">
                    {isLoadingMembers ? (
                      <Typography variant="h6">
                        <CircularProgress />
                      </Typography>
                    ) : (
                      <Typography variant="h1">
                        {numberOfMembers}
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
          </Grid>
        </Grid>
      </Box>
    </BasePageLayout>
  );
};
