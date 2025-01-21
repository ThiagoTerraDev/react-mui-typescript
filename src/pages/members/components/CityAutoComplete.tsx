import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { CitiesService } from "../../../shared/services/api/cities/CitiesService";
import { useDebounce } from "../../../shared/hooks";


type TAutoCompleteOption = {
  id: number;
  label: string;
}

interface ICityAutoCompleteProps {
  isExternalLoading?: boolean;
  onCitySelected?: (cityId: number) => void;
  registeredMemberCityId: number | undefined;
  error?: boolean;
  helperText?: string;
}

export const CityAutoComplete: React.FC<ICityAutoCompleteProps> = ({ 
  isExternalLoading = false, 
  onCitySelected, 
  registeredMemberCityId,
  error = false,
  helperText = "",
}) => {

  const [options, setOptions] = useState<TAutoCompleteOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCityId, setSelectedCityId] = useState<number | undefined>(undefined);
  const [autoCompleteSelectedOption, setAutoCompleteSelectedOption] = useState<TAutoCompleteOption | null>(null);

  const debouncedSearch = useDebounce(search, 850);

  useEffect(() => {
    CitiesService.getAll(1, debouncedSearch)
      .then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          const sortedOptions = result.data
            .map(city => ({ id: city.id, label: city.name}))
            .sort((a, b) => a.label.localeCompare(b.label));

          setOptions(sortedOptions);
        }
      });
  }, [debouncedSearch]);

  useEffect(() => {
    if (registeredMemberCityId) {
      setSelectedCityId(registeredMemberCityId);
    } else {
      setSelectedCityId(undefined);
    }
  }, [registeredMemberCityId]);

  useEffect(() => {
    if (selectedCityId) {
      const selectedOption = options.find(option => option.id === selectedCityId);
      setAutoCompleteSelectedOption(selectedOption || null);
    } else {
      setAutoCompleteSelectedOption(null);
    }
  }, [selectedCityId]);

  return (
    <Autocomplete 
      options={options}
      value={autoCompleteSelectedOption}
      loading={isLoading}
      disabled={isExternalLoading}
      popupIcon={(isExternalLoading || isLoading) ? <CircularProgress size={24} /> : undefined}
      disablePortal
      renderInput={(params) => (
        <TextField
          {...params}
          label="City"
          slotProps={{
            inputLabel: { shrink: true },
            formHelperText: {
              sx: {
                maxHeight: "20px",
              },
            }}}
          placeholder="Select a city"
          error={error && !selectedCityId}
          helperText={helperText && !selectedCityId ? helperText : ""}
        /> 
      )}
      onInputChange={(_, newSearchValue) => {
        setSearch(newSearchValue);
        setIsLoading(true);

        if (!newSearchValue) onCitySelected?.(0);
      }}
      onChange={(_, newValue) => {
        const cityId = newValue?.id;

        setIsLoading(false);
        setSelectedCityId(cityId);
                
        if (cityId) onCitySelected?.(cityId);
      }}
    />
  );
};
