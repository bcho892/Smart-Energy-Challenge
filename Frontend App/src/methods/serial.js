export function checkCompatiability() {
    if ("serial" in navigator) {
        return true;
    }
    return false;
}

export async function serialConnect() {
    let serialPort = await navigator.serial.requestPort();
    return serialPort;
}

export async function readResponse(reader) {
    let response = '';

    while (!response.endsWith('\r')) {
        let data = await reader.read();

        if (data.value !== undefined) {
            response += data;
        }

        if (data.done === true) {
            break;
        }
    }
    return response;
}

export async function serialClose() {
    await this.reader.cancel();
    await this.inputDone.catch(() => { });


    await this.port.close();
}

export async function openPort(port, baudRate) {
    await port.open({ baudRate: baudRate });

    // eslint-disable-next-line no-undef
    const decoder = new TextDecoderStream();
    // eslint-disable-next-line no-undef
    const inputStream = decoder.readable;
    // eslint-disable-next-line no-undef
    const inputDone = port.readable.pipeTo(decoder.writable);
    // eslint-disable-next-line no-undef
    const reader = inputStream.getReader();
    return {
        port: port,
        reader: reader,

        read: readResponse.bind(undefined, reader),
        close: serialClose,

        inputDone: inputDone
    }
}