import { modalStyles } from "@/shared/constants/styles";
import type { CompactiblePlatType } from "@/shared/types/device";
import { PodManagmentCard } from "@/widgets/PodManagmentCard/PodManagmentCard";
import { TankManagmentCard } from "@/widgets/TankManagmentCard/TankManagmentCard";
import { Modal } from "@mui/material";



export const PlatPreviewModal = ({
    plat,
    onClose,
}: {
    plat: CompactiblePlatType | null;
    onClose: () => void;
}) => {
    if (!plat) return <></>;
    return (
        <Modal open={Boolean(plat)} onClose={() => onClose()} sx={modalStyles}>
            {plat.type === 'pod' ? (
                <PodManagmentCard podSeries={plat.idFromPlatforms} />
            ) : (
                <TankManagmentCard tankSeries={plat.idFromPlatforms} />
            )}
        </Modal>
    );
};