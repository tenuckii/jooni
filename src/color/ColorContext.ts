export default class ColorContext{
	private static instance: ColorContext;
    private color:string;
    private constructor(){
        this.color = "#000";
    }

    public static getInstance(){
		if (!this.instance) this.instance = new ColorContext();
		return this.instance;
    }

    public static get colorCtx(){
        return this.instance;
    }

    public setSolor(_color: string){
        this.color = _color;
    }

    public getColor(){
        return this.color;
    }
}