"use client";

import React, { useState, useRef, useImperativeHandle, forwardRef } from "react";
import { Paper, Button, Typography, Box } from "@mui/material";
import SignatureCanvas from "react-signature-canvas";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';

const Firma = forwardRef((_props, ref) => {
    const [open, setOpen] = useState(false);
    const [imageURL, setImageURL] = useState("");
    const sigCanvasRef = useRef(null);

    useImperativeHandle(ref, () => ({
        getSignature: () => imageURL,
        clear: () => {
            setImageURL("");
            sigCanvasRef.current?.clear();
        },
    }));

    const saveSignature = () => {
        const dataUrl = sigCanvasRef.current
            .getTrimmedCanvas()
            .toDataURL("image/png");
        setImageURL(dataUrl);
        setOpen(false);
    };

    return (
        <Box>
            <Typography variant="subtitle1" gutterBottom>
                Firma:
            </Typography>
            <Paper
                variant="outlined"
                sx={{
                    border: "2px dashed #ccc",
                    height: 150,
                    mb: 1,
                    position: "relative",
                    overflow: "hidden",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#f9f9f9",
                }}
                onClick={() => setOpen(true)}
            >
                {imageURL ? (
                    <img
                        src={imageURL}
                        alt="Firma"
                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    />
                ) : (
                    <Typography variant="body2" color="textSecondary">
                        Haz clic para firmar
                    </Typography>
                )}
            </Paper>

            <Popup
                open={open}
                modal
                closeOnDocumentClick={false}
                onClose={() => setOpen(false)}
            >
                {(close) => (
                    <Box sx={{ p: 2, textAlign: "center" }}>
                        <Typography variant="h6" gutterBottom>
                            Firma aquí
                        </Typography>
                        <Paper
                            variant="outlined"
                            sx={{
                                border: "2px dashed #ccc",
                                height: 200,
                                mb: 2,
                                position: "relative",
                                overflow: "hidden",
                            }}
                        >
                            <SignatureCanvas
                                penColor="black"
                                canvasProps={{
                                    width: 400,
                                    height: 200,
                                    style: { width: "100%", height: "200px" },
                                }}
                                ref={sigCanvasRef}
                                backgroundColor="#fff"
                            />
                        </Paper>
                        <Box sx={{ display: "flex", justifyContent: "space-around", mt: 2 }}>
                            <Button variant="outlined" onClick={() => sigCanvasRef.current.clear()}>
                                Limpiar
                            </Button>
                            <Button variant="contained" onClick={saveSignature}>
                                Guardar
                            </Button>
                            <Button color="error" onClick={() => setOpen(false)}>
                                Cancelar
                            </Button>
                        </Box>
                    </Box>
                )}
            </Popup>
        </Box>
    );
});

Firma.displayName = "Firma";
export default Firma;
