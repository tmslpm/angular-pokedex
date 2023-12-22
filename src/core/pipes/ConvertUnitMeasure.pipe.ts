import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'convertUnitMeasure', standalone: true })
export class ConvertUnitMeasure implements PipeTransform {
    private static readonly UNITS = {
        /* height */
        mm: { key: 'mm', conversion: 1 },
        cm: { key: 'cm', conversion: 10 },
        dm: { key: 'dm', conversion: 100 },
        m: { key: 'm', conversion: 1000 },
        dam: { key: 'dam', conversion: 10000 },
        hm: { key: 'hm', conversion: 100000 },
        km: { key: 'km', conversion: 1000000 },
        /* weight */
        mg: { key: 'mg', conversion: 1 },
        cg: { key: 'cg', conversion: 10 },
        dg: { key: 'dg', conversion: 100 },
        g: { key: 'g', conversion: 1000 },
        dag: { key: 'dag', conversion: 10000 },
        hg: { key: 'hg', conversion: 100000 },
        kg: { key: 'kg', conversion: 1000000 },
    }

    public transform(value: number, from: keyof typeof ConvertUnitMeasure.UNITS, to: keyof typeof ConvertUnitMeasure.UNITS): string {
        let tryGetFrom = ConvertUnitMeasure.UNITS[from];
        if (!tryGetFrom)
            throw new Error("Invalid paramater for 'from'")

        let tryGetTo = ConvertUnitMeasure.UNITS[to];
        if (!tryGetTo)
            throw new Error("Invalid paramater for 'to'")

        let result = (value * tryGetFrom.conversion) / tryGetTo.conversion;

        console.log(`${value} ${tryGetFrom.key} équivaut à ${result} ${tryGetTo.key}`);

        return `${result} ${tryGetTo.key}`;
    }

}
