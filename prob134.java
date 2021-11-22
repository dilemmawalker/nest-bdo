class Solution {
    public int canCompleteCircuit(int[] gas, int[] cost) {
        int n=gas.length;
        
        for(int i=0;i<n;i++){
            boolean flag=false;
            if(gas[i]>=cost[i]){
                flag=check(i,gas,cost);
            }
            if(flag)
                return i;
        }
        return -1;
    }
    public boolean check(int idx,int[]gas,int []cost){
        int n=gas.length;
        int c=0;
        // System.out.println(idx);
        // c+=gas[idx];
        for(int i=idx;i<n;i++){
            if(i!=idx && c<=0)
                return false;
            c+=gas[i];
            c-=cost[i];
            
        }
        for(int i=0;i<idx;i++){
            if(c<=0)
                return false;
            c+=gas[i];
            c-=cost[i];
           
        }
        if(c<0)
            return false;
        return true;
    }
}