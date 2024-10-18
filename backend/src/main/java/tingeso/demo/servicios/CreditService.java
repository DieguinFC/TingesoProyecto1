package tingeso.demo.servicios;

import java.util.List;
public class CreditService {

    public float mortgage_credit_sim(int P, float r, int n){
        float monthly_r = r/ 12 / 100;
        int plazo_n = n * 12;

        float power_of = (float) Math.pow((1 + monthly_r),plazo_n);
        float upper_div = monthly_r * power_of;
        float M = P * (upper_div)/(power_of - 1);

        return M;
    }
}
