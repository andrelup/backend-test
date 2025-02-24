
// Mock Data
const products = {
    "1": { id: "1", name: "Product 1", price: 10.0, availability: true },
    "2": { id: "2", name: "Product 2", price: 15.0, availability: false },
    "3": { id: "3", name: "Product 3", price: 20.0, availability: true }
};

const similarProducts = {
    "1": ["2", "3"],
    "2": ["1"],
    "3": ["1"]
};


exports.getSimilarProducts = (req, res, next) => {
    const { productId } = req.params;
    
    if (!similarProducts[productId]) {
        return res.status(404).json({ error: "Product Not Found" });
    }
    
    const similar = similarProducts[productId].map(id => products[id]).filter(Boolean);
    res.json(similar);
    next();
};