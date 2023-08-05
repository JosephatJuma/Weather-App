import React, { useState } from "react";
import {
  createStyles,
  Title,
  SimpleGrid,
  Text,
  Button,
  ThemeIcon,
  ScrollArea,
} from "@mantine/core";
import { Col, rem, Card, Group, ActionIcon, Image, Grid } from "@mantine/core";
import { Flex, Drawer, Switch, Tabs, Paper, TextInput } from "@mantine/core";
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

  const deviceLocation = async (evt) => {
    const location = "Kampala";
    setQuery(location);
    await fetch(
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
  const [forecast, setForecast] = useState({});
  React.useEffect(() => {
    deviceLocation();
  }, []);

  React.useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          console.log("Latitude:", latitude);
          console.log("Longitude:", longitude);
          // Do something with the location data
          fetch(
            //`${api_key.base}onecall?lat=${latitude}&lon=${longitude}&appid=${api_key.key}`
            `${api_key.base}onecall?lat=${latitude}&lon=${longitude}&appid=${api_key.key}`
          )
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              console.log(data);
              setForecast(data);
            })
            .catch((error) => {
              console.log(error);
            });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not available");
    }
  }, []);

  const items = features.map((feature) => (
    <Card shadow="lg" radius={"lg"} withBorder>
      <Flex
        style={{
          justifyContent: "space-between",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <ThemeIcon
            size={44}
            radius="md"
            variant="gradient"
            gradient={{ deg: 133, from: "blue", to: "cyan" }}
          >
            <feature.icon size={rem(26)} stroke={1.5} />
          </ThemeIcon>
        </div>
        <div>
          <Text fz="lg" mt="sm" fw={500}>
            {feature.title}
          </Text>
          <Title c="dimmed" fz="xl">
            {feature.value}
          </Title>
        </div>
      </Flex>
    </Card>
  ));

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
                    <SimpleGrid
                      cols={2}
                      spacing={20}
                      breakpoints={[{ maxWidth: "md", cols: 1 }]}
                    >
                      {items}
                    </SimpleGrid>
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
          <Card m={2} shadow="lg" radius={"md"} mt={10} withBorder>
            <Text>Forecast is coming soon</Text>
            <Tabs
              //defaultValue={Object.keys(forecast).length > 0 && forecast[0].dt}
              defaultValue={
                Object.keys(forecast).length > 0 && forecast.daily[0].dt
              }
              unstyled
              styles={(theme) => ({
                tab: {
                  ...theme.fn.focusStyles(),
                  backgroundColor:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[6]
                      : theme.white,
                  color:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[0]
                      : theme.colors.gray[9],
                  border: `${rem(1)} solid ${
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[6]
                      : theme.colors.gray[4]
                  }`,
                  padding: `${theme.spacing.xs} ${theme.spacing.md}`,
                  cursor: "pointer",
                  fontSize: theme.fontSizes.sm,
                  display: "flex",
                  alignItems: "center",

                  "&:disabled": {
                    opacity: 0.5,
                    cursor: "not-allowed",
                  },

                  "&:not(:first-of-type)": {
                    borderLeft: 0,
                  },

                  "&:first-of-type": {
                    borderTopLeftRadius: theme.radius.md,
                    borderBottomLeftRadius: theme.radius.md,
                  },

                  "&:last-of-type": {
                    borderTopRightRadius: theme.radius.md,
                    borderBottomRightRadius: theme.radius.md,
                  },

                  "&[data-active]": {
                    backgroundColor: theme.fn.primaryColor(),
                    borderColor: theme.colors.blue[7],
                    color: theme.white,
                  },
                },
                tabIcon: {
                  marginRight: theme.spacing.xs,
                  display: "flex",
                  alignItems: "center",
                },

                tabsList: {
                  display: "flex",
                },
              })}
            >
              <ScrollArea>
                <Tabs.List>
                  {Object.keys(forecast).length > 0 &&
                    forecast.daily.map((item, index) => {
                      const date = new Date(item.dt * 1000);
                      const dateString = date.toLocaleDateString();
                      return (
                        <Tabs.Tab value={`${item.dt}`}>{dateString}</Tabs.Tab>
                      );
                    })}
                </Tabs.List>
              </ScrollArea>
              {Object.keys(forecast).length > 0 &&
                forecast.daily.map((item, index) => {
                  const date = new Date(item.dt * 1000);
                  const dateString = date.toLocaleString();
                  return (
                    <Tabs.Panel value={`${item.dt}`} pt="xs">
                      <Paper
                        shadow="sm"
                        padding="auto"
                        radius="sm"
                        withBorder
                        className={classes.category}
                        p={10}
                        key={index}
                      >
                        <Group>
                          <Text size={"lg"} fw={"bold"}>
                            {dateString}
                          </Text>
                        </Group>
                        <Group>
                          <Text>Time Zone: {forecast.timezone}</Text>
                        </Group>
                      </Paper>
                    </Tabs.Panel>
                  );
                })}
            </Tabs>
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
        <Drawer.Body>
          <Group position="center" my={30}>
            <Title>Change theme</Title>
            <Switch
              checked={theme === "dark"}
              onChange={() => toggleColorScheme()}
              size="lg"
              onLabel={<IconSun size="1.25rem" stroke={1.5} />}
              offLabel={<IconMoonStars size="1.25rem" stroke={1.5} />}
            />
          </Group>
        </Drawer.Body>
      </Drawer>
    </div>
  );
}
