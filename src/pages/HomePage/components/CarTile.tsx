import Image from 'next/image';
import {View, Link, Flex, Text} from "vcc-ui";
import { ICar } from "@/types/Car";
import { ROUTING } from "@/constants/routing";

const Header = ({ car }: { car: ICar }) => (
  <Flex extend={{ height: '4rem', margin: "0.5rem 0" }} >
    <Text variant="bates" subStyle="emphasis" fg="foreground.secondary">{car.bodyType.toUpperCase()}</Text>
    <Text as={'h3'} subStyle="emphasis" >
      <View extend={{
        justifyContent: 'flex-start',
        flexWrap:'wrap',
      }}
      >
        <Text extend={{ paddingRight: 5, flex: 1, minWidth: '50%' }}>
          { car.modelName }
        </Text>
        <Text fg="foreground.secondary" subStyle="standard"
          extend={{ flex: 1,  minWidth: '50%' }}
        >
          { car.modelType }
        </Text>
      </View>
    </Text>

  </Flex>

)

const Footer = ({ id }: {id: string}) => (
  <View justifyContent={'center'} direction={'row'} spacing={2}>
    <Link href={`/${ROUTING.LEARN}/${id}`} arrow={'right'}>{'LEARN'}</Link>
    <Link href={`/${ROUTING.SHOP}/${id}`} arrow={'right'}>{'SHOP'}</Link>
  </View>
)

export const CarTile = ({ car }: { car: ICar }) => {
  return (
    <View
      extend={{
        onlyS: {
          width: '70vw'
        },
        onlyM: {
          width: '45vw',
        },
        fromL: {
          width: '16vw',
        },
        padding: '0.25rem 0.75rem'
      }}
    >
      <Link
        href={`/${ROUTING.LEARN}/${car.id}`}
        aria-label={`Volvo ${car.modelName} ${car.bodyType} ${car.modelType} car`}
      >
        <Header car={car} />
        <Image
          src={car.imageUrl}
          alt={`Volvo ${car.modelName} ${car.bodyType} ${car.modelType} car`}
          width={'290'}
          height={'220'}
          layout="responsive"
          objectFit="cover"
        />
      </Link>
      <Footer id={car.id}/>
    </View>
  );
}
