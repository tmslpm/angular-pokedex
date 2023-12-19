import { LangSwitchComponent } from "@/components/SwitchLang/switch-lang.component";

export class TTS {
    private _voice: SpeechSynthesisVoice | null;
    private _pitch: number;
    private _rate: number;

    public constructor(localLang: string) {
        this._voice = null;
        this._pitch = 1;
        this._rate = 0.85;
        if (window.speechSynthesis && speechSynthesis.onvoiceschanged !== undefined)
            window.speechSynthesis.onvoiceschanged = () => this.trySetupVoice(localLang);
        else console.warn("TTS not available...");
    }

    public speak(text: string) {
        if (this.enabled) {
            let speechSynthesisUtterance = new SpeechSynthesisUtterance(text);
            speechSynthesisUtterance.voice = this._voice;
            speechSynthesisUtterance.pitch = this._pitch;
            speechSynthesisUtterance.rate = this._rate;
            window.speechSynthesis.speak(speechSynthesisUtterance);
        } else {
            console.warn(`TTS not available, impossible to speak the text: ${text}...`);
        }
    }

    private trySetupVoice(localLang: string): void {
        let voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
            // try get local google voice
            let tryGetGoogleVoice = voices.filter(v => v.name.toLowerCase().includes("google") || v.voiceURI.toLowerCase().includes("google"))
            if (tryGetGoogleVoice.length > 0) {
                let tryFindLocalGoogleVoice = tryGetGoogleVoice.find(v => v.lang.includes(localLang));
                if (tryFindLocalGoogleVoice) {
                    this._voice = tryFindLocalGoogleVoice;
                    return;
                }
            }

            // not found local voice.. try get other voice
            let tryGetOtherLocalVoice = voices.find(v => v.lang.includes(localLang));
            if (tryGetOtherLocalVoice) {
                this._voice = tryGetOtherLocalVoice;
                return;
            }

            // not found local voice in list try get default voice
            let tryGetDefaultVoice = voices.find(v => v.default);
            if (tryGetDefaultVoice) {
                this._voice = tryGetDefaultVoice;
            }
        }
    }

    // G e t t e r - S e t t e r

    public get enabled(): boolean {
        return this._voice != null;
    }

    public set pitch(v: number) {
        this._pitch = v;
    }

    public set rate(v: number) {
        this._rate = v;
    }

}
