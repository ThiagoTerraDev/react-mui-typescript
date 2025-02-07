import { 
  Box, 
  Button, 
  Card, 
  CardActions, 
  CardContent, 
  CircularProgress, 
  TextField, 
  Typography 
} from "@mui/material";
import { useAuthContext } from "../../contexts";
import { useState } from "react";
import { z } from "zod";


const loginValidationSchema = z.object({
  email: z.string().nonempty("This field must contain at least 1 character(s)").email("Please enter a valid email"),
  password: z.string().nonempty("This field must contain at least 1 character(s)").min(5, "Password must be at least 5 characters long"),
});

interface ILoginErrors {
  email?: string;
  password?: string;
}

interface ILoginProps {
  children: React.ReactNode;
}

export const Login: React.FC<ILoginProps> = ({ children }) => {
  const { isAuthenticated, login } = useAuthContext();
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ errors, setErrors ] = useState<ILoginErrors>({});
  const [ isLoading, setIsLoading ] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);

    try {
      loginValidationSchema.parse({ email, password });

      setErrors({});
      login(email, password)
        .then(() => setIsLoading(false));
    } catch (error) {
      setIsLoading(false);

      if (error instanceof z.ZodError) {
        const errorMap = error.formErrors.fieldErrors;

        setErrors({
          email: errorMap.email?.[0],
          password: errorMap.password?.[0]
        });
      }
    }
  };

  if (isAuthenticated) return <>{children}</>;

  return (
    <Box width="100vw" height="100vh" display="flex" justifyContent="center" alignItems="center">
      <Card>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={2} width={300}>
            <Typography variant="h6" align="center" pb={1.5} pt={1}>
              Please login to continue
            </Typography>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              disabled={isLoading}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
              disabled={isLoading}
            />
          </Box>
        </CardContent>
        <CardActions>
          <Box width="100%" display="flex" justifyContent="center" pb={1.5}>
            <Button 
              variant="contained" 
              onClick={handleSubmit}
              disabled={isLoading}
              endIcon={isLoading && <CircularProgress size={20} />}
            >
              {isLoading ? "Loading" : "Login"}
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
};
