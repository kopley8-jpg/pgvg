import { onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { styleSheetCreate, toArray } from './lib';
import type {
  CoilInContainType,
  CoilType,
  DeviceType,
  PlatformType,
  PodType,
  TankType,
} from './model';
import { database } from './firebase';
import { ArrayObj, ObjCard, PrimitiveValue } from './Card/Entries/DefaultEntry';

export default function Main() {
  const [devices, setDevices] = useState<(DeviceType & { id: string })[]>([]);
  const [_pods, setPods] = useState<(PodType & { id: string })[]>([]);
  const [_tanks, setTanks] = useState<(TankType & { id: string })[]>([]);
  const [_coils, setCoils] = useState<(CoilType & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const kochegarRef = ref(database, 'kochegar');
    onValue(
      kochegarRef,
      (snapshot) => {
        const data = snapshot.val();
        const newPods = toArray<PodType>(data.platform.cartridges);
        const dataTanks = toArray<
          Omit<TankType, 'coils'> & { coils: string[] }
        >(data.platform.tanks);
        const newCoils = toArray<CoilType>(data.platform.coils);
        const dataDevices = toArray<
          Omit<DeviceType, 'platforms' | 'coilsInContain'> & {
            platforms: string[];
            coilsInContain: '' | CoilInContainType[];
          }
        >(data.podiki);

        const newTanks: TankType[] = dataTanks.map((tank) => ({
          ...tank,
          coils: tank.coils
            .map((name) => newCoils.filter((coil) => coil.name === name))
            .flat(),
        }));

        const newDevices: DeviceType[] = dataDevices.map((device) => ({
          ...device,
          platforms: device.platforms
            .map((name) => [
              ...newPods
                .filter((pod) => pod.name === name)
                .map((pod) => {
                  const type: 'tank' | 'pod' = 'pod';
                  return { ...pod, type: type };
                }),
              ...newTanks
                .filter((tank) => tank.name === name)
                .map((pod) => {
                  const type: 'tank' | 'pod' = 'tank';
                  return { ...pod, type: type };
                }),
            ])
            .flat(),
          coilsInContain:
            typeof device.coilsInContain === 'string'
              ? []
              : device.coilsInContain,
        }));

        setPods(newPods);
        setTanks(newTanks);
        setCoils(newCoils);
        setDevices(newDevices);

        console.log(newDevices);
        setLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  if (loading) return <div className="loader">Загрузка...</div>;

  return (
    <div style={styles.container}>
      {devices.map((device) => (
        <ObjCard
          data={device}
          renderHeaderItem={() => (
            <>
              <PrimitiveValue
                keyName=""
                showKeyName={false}
                value={device.brand}
              />
              <PrimitiveValue
                keyName=""
                showKeyName={false}
                value={device.model}
              />
            </>
          )}
          renderArrayObj={(key, value) => (
            <>
              {key === 'platforms' ? (
                <>
                  <ArrayObj
                    keyName="Платформы"
                    value={value as PlatformType[]}
                    renderItem={(platform) => (
                      <>
                        {platform.type === 'pod' ? (
                          <ObjCard
                            renderHeaderItem={() => (
                              <PrimitiveValue
                                keyName=""
                                showKeyName={false}
                                value={platform.name}
                              />
                            )}
                            key={platform.name}
                            data={platform}
                            filterProps={['type', 'id', 'name']}
                          />
                        ) : (
                          <>
                            {platform.type === 'tank' ? (
                              <>
                                <ObjCard
                                  renderHeaderItem={() => (
                                    <PrimitiveValue
                                      keyName=""
                                      showKeyName={false}
                                      value={platform.name}
                                    />
                                  )}
                                  renderArrayObj={(key, value) => (
                                    <>
                                      {key === 'coils' ? (
                                        <ArrayObj
                                          keyName={'Серии испариков:'}
                                          value={value as CoilType[]}
                                          renderItem={(item) => (
                                            <ObjCard
                                              data={item}
                                              renderHeaderItem={() => (
                                                <PrimitiveValue
                                                  keyName=""
                                                  showKeyName={false}
                                                  value={item.name}
                                                />
                                              )}
                                              filterProps={['id', 'name']}
                                            />
                                          )}
                                        />
                                      ) : (
                                        <></>
                                      )}
                                    </>
                                  )}
                                  key={platform.name}
                                  data={platform as TankType}
                                  filterProps={['type', 'id', 'name']}
                                />
                              </>
                            ) : (
                              <></>
                            )}
                          </>
                        )}
                      </>
                    )}
                  />
                </>
              ) : (
                <></>
              )}
            </>
          )}
          photo={device.photo}
          filterProps={['photo', 'brand', 'model', 'id', 'type']}
        />
      ))}
    </div>
  );
}

const styles = styleSheetCreate({
  container: {
    backgroundColor: '#d6d6d6',

    width: '100vw',
    height: '100vh',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '5%',
    boxSizing: 'border-box',

    gap: '5%',

    overflowY: 'auto',
  },
});
