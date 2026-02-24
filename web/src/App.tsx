import { useState } from 'react'
import { Sparkles, Upload, Shield, Zap, CheckCircle2, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function App() {
    const [file, setFile] = useState<File | null>(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [progress, setProgress] = useState(0)

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        if (selectedFile) {
            setFile(selectedFile)
        }
    }

    const startProcessing = async () => {
        if (!file) return;
        setIsProcessing(true);
        setProgress(10);

        const formData = new FormData();
        formData.append('image', file);

        try {
            // Mock progress
            const interval = setInterval(() => {
                setProgress(prev => (prev < 90 ? prev + 5 : prev));
            }, 500);

            const response = await fetch('http://localhost:5000/api/enhance', {
                method: 'POST',
                body: formData,
            });

            clearInterval(interval);

            if (!response.ok) throw new Error('Enhancement failed');

            const data = await response.json();
            console.log('Success:', data);
            setProgress(100);

            // Update file with processed version (or just show success)
            setTimeout(() => {
                setIsProcessing(false);
                // In a real app, we'd set the preview to the processed URL
                // setFile(null); // Or show a success screen
            }, 500);

        } catch (error) {
            console.error('Error:', error);
            setIsProcessing(false);
            alert('Failed to enhance image. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-mesh font-['Outfit'] overflow-hidden">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/20 backdrop-blur-lg">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <Sparkles className="text-white w-6 h-6" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight">
                            Odisha <span className="gradient-text">Cloud</span>
                        </span>
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
                        <a href="#" className="hover:text-white transition-colors">Pricing</a>
                        <a href="#" className="hover:text-white transition-colors">API</a>
                        <a href="#" className="hover:text-white transition-colors">Enterprise</a>
                        <button className="glass-button py-2 px-5">Sign In</button>
                        <button className="primary-button py-2 px-5">Get Started</button>
                    </div>
                </div>
            </nav>

            <main className="pt-32 pb-20 px-6">
                {/* Hero Section */}
                <section className="max-w-7xl mx-auto text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                            Bring Your Memories <br />
                            <span className="gradient-text leading-tight">To Life Again</span>
                        </h1>
                        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                            State-of-the-art AI technology to enhance, restore, and upsize your photos in seconds. Professional quality at your fingertips.
                        </p>
                    </motion.div>

                    {/* Upload Area */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="max-w-3xl mx-auto"
                    >
                        <div className="glass-card p-1">
                            <div className="bg-[#0f172a]/80 backdrop-blur-2xl rounded-[15px] p-8 min-h-[400px] flex flex-col items-center justify-center relative border border-white/5">
                                {!file ? (
                                    <>
                                        <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mb-6 group cursor-pointer transition-transform hover:scale-110">
                                            <Upload className="w-10 h-10 text-blue-500 group-hover:text-blue-400" />
                                        </div>
                                        <h3 className="text-2xl font-semibold mb-2">Drop image here</h3>
                                        <p className="text-slate-400 mb-8 font-light">Supports JPG, PNG, WEBP (Max 10MB)</p>
                                        <label className="primary-button cursor-pointer flex items-center gap-2 group">
                                            Choose Photo
                                            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                            <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
                                        </label>
                                    </>
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center">
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt="Preview"
                                            className="max-h-[300px] rounded-lg shadow-2xl mb-6 object-contain"
                                        />
                                        <div className="flex gap-4">
                                            {isProcessing ? (
                                                <div className="w-64">
                                                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden mb-2">
                                                        <motion.div
                                                            className="h-full bg-gradient-to-r from-blue-500 to-violet-500"
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${progress}%` }}
                                                        />
                                                    </div>
                                                    <p className="text-sm text-slate-400 text-center animate-pulse">Enhancing details... {progress}%</p>
                                                </div>
                                            ) : (
                                                <>
                                                    <button onClick={() => setFile(null)} className="glass-button">Discard</button>
                                                    <button onClick={startProcessing} className="primary-button flex items-center gap-2">
                                                        <Zap className="w-4 h-4 fill-current" />
                                                        Enhance Now
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* Features Section */}
                <section className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
                    {[
                        { title: "Face Restoration", icon: <CheckCircle2 className="w-6 h-6 text-emerald-400" />, desc: "AI-powered facial reconstruction for blurry or old portraits." },
                        { title: "4K Upscaling", icon: <Shield className="w-6 h-6 text-blue-400" />, desc: "Upscale low-resolution images to 4K without losing quality." },
                        { title: "Instant Result", icon: <Zap className="w-6 h-6 text-amber-400" />, desc: "Lightning fast processing powered by our cloud GPU farm." }
                    ].map((feature, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -5 }}
                            className="glass-card p-8 flex flex-col items-center text-center group"
                        >
                            <div className="mb-4 p-3 rounded-xl bg-white/5 transition-colors group-hover:bg-white/10">
                                {feature.icon}
                            </div>
                            <h4 className="text-xl font-semibold mb-3">{feature.title}</h4>
                            <p className="text-slate-400 font-light text-sm leading-relaxed">{feature.desc}</p>
                        </motion.div>
                    ))}
                </section>
            </main>

            {/* Footer */}
            <footer className="mt-20 border-t border-white/10 py-12">
                <div className="max-w-7xl mx-auto px-6 text-center text-slate-500 text-sm">
                    <p>© 2026 Odisha Cloud. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}
