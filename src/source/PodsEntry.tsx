import React, { useEffect, useState } from "react";
import type { PodType } from "./model";
import { array } from "firebase/firestore/pipelines";

interface IPodsEntry {
  names: string[];
  pods: PodType[];
}

export const PodsEntry = ({ names, pods }: IPodsEntry) => {
  const [currentPods, setCurrentPods] = useState<(PodType | string)[]>([]);
  const [pickedPod, setPickedPod] = useState<PodType | null>(null)

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
      {pickedPod
        ? <PodEntry pod={pickedPod} />
        : <PodsList pods={currentPods} onItemPress={setPickedPod} />}

    </div>
  );
};

interface IPodsList {
  pods: (PodType | string)[];
  onItemPress: ((pod: PodType) => void)
}

const PodsList = ({ pods, onItemPress }: IPodsList) => {

  const handleClick = (pod: string | PodType) => {
    if (typeof pod === "string") return
    onItemPress(pod)
  }

  return (
    <div style={styles.podsListContainer}>
      {pods.map((pod, index) => (
        <PodItem key={index} pod={pod} onClick={() => handleClick(pod)} />
      ))}
      <div style={styles.addPodButton}>+</div>
    </div>
  );
};

interface IPodEntry {
  pod: PodType
}

const PodEntry = ({ pod }: IPodEntry) => {
  console.log(pod)
  return (
    <div style={styles.podEntry}>
      {Object.entries(pod).map(([key, value], index) => {
        if (typeof value === "string") {
          return (<a>{key + " " + value}</a>)
        }
      })}
    </div>
  )
}

interface IPodItem {
  pod: PodType | string;
  onClick: (() => void)
}

const PodItem = ({ pod, onClick }: IPodItem) => {
  return (
    <div style={styles.podItemContainer} onClick={onClick}>
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
    alignItems: 'center',
    borderRadius: "10px",
    justifyContent: 'center',
    backgroundColor: "grey"
  },
  podEntry: {
    width: "100%",
    height: "100%",
  }
};
