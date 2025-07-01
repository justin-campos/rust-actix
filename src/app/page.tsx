"use client";

import { useState, useRef } from "react";
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Box,
} from "@mui/material";
import Firma from "@/components/firma";

export default function Home() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        nombre: "",
        cedula: "",
        telefono: "",
        firma: "",
    });

    const firmaRef = useRef(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const handleSubmit = () => {
        const signatureDataURL = firmaRef.current?.getSignature() ?? "";
        const fullData = { ...formData, firma: signatureDataURL };

        console.log("Formulario enviado:", fullData);
        alert("Formulario enviado (ver consola para la firma en base64)");
    };

    const paperStyle = {
        p: 4,
        borderTop: "3px solid #005da6",
        borderRadius: 2,
        boxShadow: "0 1px 1px rgba(0,0,0,0.1)",
        background: "#eee",
        fontFamily: "tahoma, arial, verdana, sans-serif",
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Paper elevation={3} sx={paperStyle}>
                {step === 1 && (
                    <>
                        <Typography variant="h5" gutterBottom>
                            Paso 1: Datos personales
                        </Typography>
                        <Box component="form" noValidate autoComplete="off">
                            <TextField
                                label="Nombre"
                                name="nombre"
                                fullWidth
                                margin="normal"
                                value={formData.nombre}
                                onChange={handleChange}
                                sx={{ fontFamily: "tahoma, arial, verdana, sans-serif" }}
                            />
                            <TextField
                                label="Cédula"
                                name="cedula"
                                fullWidth
                                margin="normal"
                                value={formData.cedula}
                                onChange={handleChange}
                                sx={{ fontFamily: "tahoma, arial, verdana, sans-serif" }}
                            />
                            <TextField
                                label="Teléfono"
                                name="telefono"
                                fullWidth
                                margin="normal"
                                value={formData.telefono}
                                onChange={handleChange}
                                sx={{ fontFamily: "tahoma, arial, verdana, sans-serif" }}
                            />
                            <Box sx={{ mt: 2, textAlign: "right" }}>
                                <Button
                                    variant="contained"
                                    onClick={nextStep}
                                    sx={{ fontFamily: "tahoma, arial, verdana, sans-serif" }}
                                >
                                    Siguiente
                                </Button>
                            </Box>
                        </Box>
                    </>
                )}

                {step === 2 && (
                    <>
                        <Typography variant="h5" gutterBottom>
                            Paso 2: Consentimiento
                        </Typography>
                        <Typography
                            variant="body1"
                            paragraph
                            sx={{ mt: 2, fontFamily: "tahoma, arial, verdana, sans-serif" }}
                        >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod
                            eu lorem et ultricies. In porta lorem at dui semper porttitor. Nullam
                            quis cursus dui. Vestibulum et felis ut nisl posuere gravida. Lorem
                            ipsum dolor sit amet, consectetur adipiscing elit. Donec blandit
                            mauris sit amet nisi ullamcorper, in facilisis risus placerat.
                        </Typography>

                        <Box sx={{ mt: 3 }}>
                            <Firma ref={firmaRef} />
                        </Box>

                        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                            <Button
                                variant="outlined"
                                onClick={prevStep}
                                sx={{ fontFamily: "tahoma, arial, verdana, sans-serif" }}
                            >
                                Atrás
                            </Button>
                            <Button
                                variant="contained"
                                color="success"
                                onClick={handleSubmit}
                                sx={{ fontFamily: "tahoma, arial, verdana, sans-serif" }}
                            >
                                Finalizar
                            </Button>
                        </Box>
                    </>
                )}
            </Paper>
        </Container>
    );
}
