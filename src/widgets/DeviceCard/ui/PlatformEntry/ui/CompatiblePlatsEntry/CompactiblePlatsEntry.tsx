import { ObjEntryTwo } from "@/shared/ui/ObjEntry/ObjEntry";
import type { ICompactiblePlatsEntry } from "./model/types";
import { createRenderConfig } from "@/shared/lib/createRenderConfig";
import { PlatItem } from "../PlatItem/PlatItem";
import { useCompatiblePlatsEntry } from "./model/useCompatiblePodsEntry";
import { PlatformModal } from "../PlatformModal/PlatformModal";
import { IconButton } from "@mui/material";
import { Add } from "@mui/icons-material";


export const CompactiblePlatsEntry = ({ compactiblePlats, onChange }: ICompactiblePlatsEntry) => {

  const { openPlat, handlePlatPick, handleBackdropModalClick, handlePlatItemDeleteButtonClick } = useCompatiblePlatsEntry({ compactiblePlats, onChange })

  return (
    <ObjEntryTwo
      translatedNamesForKeys={{}}
      entryName="Поддерживает"
      renderForKeys={[
        ...(compactiblePlats ? compactiblePlats : [])
          .map((plat) =>
            createRenderConfig({ plat }).forKeys(
              ['plat'],
              (key, value) => (
                <>
                  <PlatformModal isOpen={openPlat?.id === value.idFromPlatforms ? true : false} plat={{ ...plat, id: plat.idFromPlatforms }} onBackdropClick={handleBackdropModalClick} />
                  <PlatItem platform={plat} onClick={handlePlatPick} onDeleteButtonClick={handlePlatItemDeleteButtonClick} />
                </>
              ),
              { hideKeyName: true }
            )
          ).flat(),
        ...createRenderConfig({ aaa: 3 }).forKeys(["aaa"], () => (
          <IconButton sx={{ width: "24vw" }}>
            <Add />
          </IconButton>
        ), { hideKeyName: true })
      ]}
    />
  );
};