import React, {useState, useMemo} from "react";
import { Flex, Text, useTheme } from "vcc-ui";
import { ICar } from '@/types/Car';


export const CarSearch = ({ originalCars, setCars }:{ originalCars: Array<ICar>, setCars: (cars: Array<ICar>) => void }) => {

  const [activeFilter, setActiveFilter] = useState<null | string>(null);
  const theme = useTheme();

  const bodyTypes = useMemo(() => {
    return originalCars.reduce((acc: Record<string, Array<ICar>>, item: ICar) => {
      if (!acc[item.bodyType]) {
        acc[item.bodyType] = [];
      }
      acc[item.bodyType].push(item);
      return acc;
    }, {});
  }, [originalCars]);

  const onFilterClick = (preFilteredCars: Array<ICar>, filter: string | null) => {
    setCars(preFilteredCars);
    setActiveFilter(filter);
  }
  return (


    <Flex extend={{
      marginBottom: '0.25rem',
      flexDirection: "row",
      justifyContent: 'center'
    }}>

      <Text
        onClick={() => onFilterClick(originalCars, null)}
        extend={{
          marginRight: '0.5rem',
          color: activeFilter === null ? theme.color.foreground.primary : theme.color.foreground.secondary
        }}
      >All: ({originalCars.length})</Text>
      {
        Object.keys(bodyTypes).map((key: string, i: number) => (
          <Text
            onClick={() => onFilterClick(bodyTypes[key], key)}
            extend={{
              marginRight: '0.5rem',
              color: activeFilter === key ? theme.color.foreground.primary : theme.color.foreground.secondary
            }}

            key={i}
          >{key}: ({bodyTypes[key].length})
          </Text>
        ))
      }
    </Flex>

  )
}
