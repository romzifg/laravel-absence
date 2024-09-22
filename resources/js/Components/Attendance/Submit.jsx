import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import Selectbox from "@/Components/Selectbox";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function SubmitAttendance() {
    const [loadPosition, setLoadPosition] = useState(false)
    const [transitioning, setTransitioning] = useState(false);
    const [userPos, setUserPos] = useState({ latitude: null, longitude: null });

    const { data, setData, post, transform, errors, processing } = useForm({
        status: "attend",
        description: "",
        latitude: "",
        longitude: "",
    });

    const submit = async (e) => {
        e.preventDefault();

        if (
            data.position.hasOwnProperty("latitude") &&
            data.position.hasOwnProperty("longitude")
        ) {
            transform((data) => ({
                ...userPos,
                status: data.status,
                description: data.description,
            }));

            post(route("attendances.submit"), {
                preserveScroll: true,
                onSuccess: () => {
                    alert("Berhasil Absen");
                },
                onError: (e) => {
                    console.log(e);
                    alert("Gagal Absen");
                },
            });
        }
    };

    useEffect(() => {
        (() => {
            navigator.geolocation.getCurrentPosition((pos) => {
                const newUserPos = {
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude,
                };
                setUserPos(newUserPos);
                setLoadPosition(true);
            });
        })();
    }, []);

    useEffect(() => {
        if (data.status === "attend") {
            setTransitioning(false);
        } else {
            setTransitioning(true);
        }
    }, [data.status]);

    return (
        <form onSubmit={submit} className="mt-6 space-y-6">
            <div>
                <InputLabel htmlFor="info" value="Silahkan Absen" />

                <Selectbox
                    onChange={(e) => setData("status", e.target.value)}
                    classname="border-gray-300 foucs:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                    options={[
                        { value: "attend", label: "Hadir" },
                        { value: "leave", label: "Cuti" },
                        { value: "sick", label: "Sakit" },
                        { value: "permit", label: "Izin" },
                        { value: "business_trip", label: "Perjalanan Dinas" },
                        { value: "remote", label: "Remote" },
                    ]}
                />

                <InputError className="mt-2" message={errors.status} />
            </div>

            <Transition
                show={transitioning}
                enter="transition ease-in-out"
                enterFrom="opacity-0"
                leave="transition ease-in-out"
                leaveTo="opacity-0"
            >
                <div>
                    <InputLabel htmlFor="description" value="Remark" />

                    <TextInput
                        onChange={(e) => setData("description", e.target.value)}
                        className="w-full"
                    />

                    <InputError className="mt-2" message={errors.description} />
                </div>
            </Transition>

            <div className="flex items-center gap-4">
                <PrimaryButton
                    disabled={
                        processing ||
                        (userPos.latitude === null &&
                            userPos.longitude === null) ||
                            !loadPosition
                    }
                >
                    Absensi
                </PrimaryButton>
            </div>
        </form>
    );
}
