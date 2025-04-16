import Color from "../../../lib/Color"
import { isKeyAvailable } from "./ChatList"

const DynoName = (props) => {
    let { msg } = props;

    let locationPart = msg?.current_location_name
        ? `${msg?.current_location_name}`
        : "";
    let shiftPart = msg?.current_shift_name
        ? `${msg?.current_shift_name}`
        : "";

    let locationShiftPart =
        locationPart && shiftPart
            ? `(${locationPart}, ${shiftPart})`
            : locationPart
                ? `(${locationPart})`
                : shiftPart
                    ? `(${shiftPart})`
                    : "";

    return (
        isKeyAvailable(msg, "isSender") && !msg.isSender) && (
            <div className="d-flex justify-content-between w-100 gap-1">
                <span
                    style={{
                        color: Color.getColorByUser(`${msg?.first_name || ""}${msg?.last_name || ""}`)
                    }}
                    className="fw-semibold small"
                >
                    {`${msg?.first_name || ""} ${msg?.last_name || ""}`}
                </span>

                {locationShiftPart && <span className="text-muted small">
                    {locationShiftPart}
                </span>}
            </div>
        )
}

export default DynoName
