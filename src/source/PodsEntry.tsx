import React, { useEffect, useState } from "react";
import type { PodType } from "./model";

interface IPodsEntry {
  names: string[];
  pods: PodType[];
}

export const PodsEntry = ({ names, pods }: IPodsEntry) => {
  const [currentPods, setCurrentPods] = useState<(PodType | string)[]>([]);

  useEffect(() => {
    setCurrentPods(
      names.map((name) => {
        const pod = pods.find((res) => res.Name === name);
        return pod ? pod : "неттакогобля";
      })
    );
  }, [pods]);

  return (
    <div style={styles.container}>
      <PodsList pods={currentPods} />
    </div>
  );
};

interface IPodsList {
  pods: (PodType | string)[];
}

const PodsList = ({ pods }: IPodsList) => {
  const [pickedPodId, setPickedPodId] = useState<string | null>();

  return (
    <div style={styles.podsListContainer}>
      {pods.map((pod, index) => (
        <PodItem key={index} pod={pod} />
      ))}
      <div style={styles.addPodButton} />
    </div>
  );
};

interface IPodItem {
  pod: PodType | string;
}

const PodItem = ({ pod }: IPodItem) => {
  return (
    <div style={styles.podItemContainer}>
      {typeof pod === "string" ? pod : pod.Name}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: "100%",
    height: "40px",
    backgroundColor: "blue",
    marginBottom: "8px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "0px",
    color: "white",
    borderRadius: "8px",
  },
  podsListContainer: {
    maxWidth: "100%",
    minHeight: "40px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    overflowX: "auto",
    overflowY: "hidden",
    padding: "0 10px",
    gap: "10px",
    flexWrap: "nowrap",
  },
  podItemContainer: {
    height: "80%",
    padding: "0 7px",
    backgroundColor: "grey",
    borderRadius: "10px",
    flexShrink: 0,
  },
  addPodButton: {
    width: "40px",
    height: "20px",
    backgroundColor: "grey"
  }
};
