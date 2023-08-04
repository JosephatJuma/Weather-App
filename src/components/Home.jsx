import React, { useState } from "react";
import {
  createStyles,
  Title,
  SimpleGrid,
  Text,
  Button,
  ThemeIcon,
  Grid,
  Col,
  rem,
  Card,
  Group,
  ActionIcon,
  TextInput,
  Image,
  Flex,
  Drawer,
  Switch,
} from "@mantine/core";
import clouds from "../img/clouds.png";
import rain from "../img/rain.png";
import sun from "../img/sun.png";
import {
  IconFlame,
  IconCircleDotted,
  IconUser,
  IconSettings,
  IconSearch,
  IconCloud,
  IconRainbow,
  IconSun,
  IconMoonStars,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
  wrapper: {
    padding: `calc(${theme.spacing.xl} * 2) ${theme.spacing.xl}`,
    width: "1000%",
    //marginLeft: 100,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(36),
    fontWeight: 900,
    lineHeight: 1.1,
    marginBottom: theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },
}));

export function Home({ toggleColorScheme, theme }) {
  const { classes } = useStyles();

  //logic
  const api_key = {
    base: "https://api.openweathermap.org/data/2.5/",
    key: "922c60e5c41e269a109d4ce1a978f327",
  };
  const [query, setQuery] = useState("Kampala");
  const [weather, setWeather] = useState({});
  const [isSearch, setIsSearch] = useState(true);
  //const [error, setError] = useState({});
  const [opened, { open, close }] = useDisclosure(false);
  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(
        `${api_key.base}weather?q=${query}&units=metric&APPID=${api_key.key}`
      )
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          console.log(result);
          setIsSearch(false);
        });
    }
  };

  const deviceLocation = (evt) => {
    const location = "Kampala";
    setQuery(location);
    fetch(
      `${api_key.base}weather?q=${location}&units=metric&APPID=${api_key.key}`
    )
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        setIsSearch(false);
      });
  };

  const features = [
    {
      icon: IconCloud,
      title: "Clouds",
      description: "The amount of clouds",
      value: weather.main ? weather.clouds.all : "None",
    },
    {
      icon: IconRainbow,
      title: "Humidity",
      description: "The level of Humidity",
      value: weather.main ? weather.main.humidity : "None",
    },
    {
      icon: IconCircleDotted,
      title: "Pressure",
      description: "Current pressure level",
      value: weather.main ? weather.main.pressure : "None",
    },
    {
      icon: IconFlame,
      title: "Speed of Wind",
      description: "The current Speed of wind",
      value: weather.main ? weather.wind.speed : "None",
    },
  ];

  const items = features.map((feature) => (
    <Card shadow="lg" radius={"lg"} withBorder>
      <Flex>
        <div>
          <ThemeIcon
            size={44}
            radius="md"
            variant="gradient"
            gradient={{ deg: 133, from: "blue", to: "cyan" }}
          >
            <feature.icon size={rem(26)} stroke={1.5} />
          </ThemeIcon>

          <Text fz="lg" mt="sm" fw={500}>
            {feature.title}
          </Text>
          <Text fz="lg" mt="sm" fw={500}>
            {feature.description}
          </Text>
        </div>
        <div>
          <Title c="dimmed" fz="xl">
            {feature.value}
          </Title>
        </div>
      </Flex>
    </Card>
  ));

  React.useEffect(() => {
    deviceLocation();
  }, []);
  return (
    <div className={classes.wrapper}>
      <Card
        shadow="lg"
        radius={"md"}
        mb={10}
        style={{ position: "sticky" }}
        withBorder
      >
        <Group sx={{ justifyContent: "space-between" }}>
          <Title size={20}>Hello User</Title>

          <Group>
            <TextInput
              icon={<IconSearch />}
              width={"50%"}
              radius={"xl"}
              value={query}
              onKeyPress={search}
              onChange={(e) => setQuery(e.target.value)}
              //isSerach={isSearch}
              //getCurrentLocation={deviceLocation}
            />
            <ActionIcon onClick={open}>
              <IconSettings />
            </ActionIcon>
            <ActionIcon>
              <IconUser />
            </ActionIcon>
          </Group>
        </Group>
      </Card>

      <Grid gutter={10}>
        <Col span={12} md={5}>
          <Card shadow="lg" radius={"lg"} withBorder>
            <Title className={classes.title} order={2}>
              Current Weather
            </Title>

            <div className="weather-part">
              {!isSearch ? (
                typeof weather.main != "undefined" ? (
                  <>
                    <Flex style={{ justifyContent: "space-between" }}>
                      <div>
                        <Title>
                          {weather.name},{weather.sys.country}
                        </Title>
                        <p>Speed of wind: {weather.wind.speed}</p>
                        <Title>{weather.main.temp}°C</Title>
                      </div>
                      {weather.weather && (
                        <div>
                          {weather.weather[0].main === "Clouds" && (
                            <Image src={clouds} width={100} />
                          )}
                          {weather.weather[0].main === "Rain" && (
                            <Image src={rain} width={100} />
                          )}
                          {weather.weather[0].main === "Clear" && (
                            <Image src={sun} width={100} />
                          )}
                          <p>{weather.weather[0].main}</p>
                        </div>
                      )}
                    </Flex>
                    {weather && (
                      <Text c="dimmed">{weather.weather[0].description}</Text>
                    )}
                  </>
                ) : (
                  <Text>City not identified</Text>
                )
              ) : (
                ""
              )}
            </div>

            <Button
              variant="gradient"
              gradient={{ deg: 133, from: "blue", to: "cyan" }}
              size="lg"
              radius="md"
              mt="xl"
              onClick={deviceLocation}
              disabled={weather.name === "Kampala"}
            >
              Check for Kampala
            </Button>
          </Card>
        </Col>
        <Col span={12} md={7}>
          <SimpleGrid
            cols={2}
            spacing={20}
            breakpoints={[{ maxWidth: "md", cols: 1 }]}
          >
            {items}
          </SimpleGrid>
          <Card m={2} shadow="lg" radius={"md"} mt={10} withBorder>
            <Text>Forecast is coming soon</Text>
          </Card>
        </Col>
      </Grid>
      <Drawer
        opened={opened}
        onClose={close}
        title="Settings"
        position="right"
        size={"xs"}
      >
        <Group position="center" my={30}>
          <Switch
            checked={theme === "dark"}
            onChange={() => toggleColorScheme()}
            size="lg"
            onLabel={<IconSun size="1.25rem" stroke={1.5} />}
            offLabel={<IconMoonStars size="1.25rem" stroke={1.5} />}
          />
        </Group>
      </Drawer>
    </div>
  );
}
