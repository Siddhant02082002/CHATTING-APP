"use client";

import { useEffect, useState } from "react";
import { CreateServerModal} from "../modals/CreateServerModal";
import { InvitationModal} from "../modals/InvitationModal";
import {DeleteServerModal} from "../modals/Delete-Server-modal";
import { MembersModal } from "../modals/members-modal";
import {CreateChannelModal} from "../modals/CreateChannel";
import DeleteChannelsModal from "../modals/DeleteChannelModal";
import { MessageFileModal } from "../modals/MessageFileModal";
export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <CreateServerModal/>
            <InvitationModal></InvitationModal>
            <DeleteServerModal></DeleteServerModal>
            <MembersModal></MembersModal>
            <CreateChannelModal></CreateChannelModal>
            <DeleteChannelsModal></DeleteChannelsModal>
            <MessageFileModal></MessageFileModal>
        </>
    )
}