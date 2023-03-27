import Arweave from "arweave";
const arweave = Arweave.init({
    host: '127.0.0.1',
    port: 1984,
    protocol: 'http'
});
export const toArweave = async (entity) => {
    let tx = await arweave.createTransaction({
        data: entity,
    });
    tx.addTag("Content-Type", "text/json");
    await arweave.transactions.sign(tx);
    const response = await arweave.transactions.post(tx);

    const url = "http://127.0.0.1:1984/" + tx.id;
    alert(url)
    return url;
}