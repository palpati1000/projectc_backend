export const sendHello = async (req, res) => {
    try {
        return res.status(200).json({ message: 'Hello from projectC Backend' });
    } catch (e) {
        console.log('Error occured while processing response for /hello');
        console.log(e);
    }
};
